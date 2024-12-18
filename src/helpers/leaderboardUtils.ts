import { Devvit } from "@devvit/public-api";

// Redis key prefixes
const PERSONAL_SCORE_PREFIX = "user_score:";
const LEADERBOARD_KEY = "global_leaderboard";
const MAX_LEADERBOARD_ENTRIES = 10;

type UserScore = {
  username: string;
  score: number;
  mode: "timer" | "streak";
  timestamp: number;
};

export async function storeUserScore(
  context: Devvit.Context,
  score: number,
  mode: "timer" | "streak",
  correct: number,
  streak: number
) {
  const { redis, userId } = context;

  if (!userId) {
    console.error("No user ID available");
    return;
  }

  const user = await context.reddit.getCurrentUser();
  const username = user?.username ?? "unknown";
  const newScore: UserScore = {
    username,
    score,
    mode,
    timestamp: Date.now(),
  };

  try {
    // Store personal best scores
    const personalKey = `${PERSONAL_SCORE_PREFIX}${userId}`;
    const existingPersonalScoresStr = await redis.get(personalKey);

    let personalScores: UserScore[] = existingPersonalScoresStr
      ? JSON.parse(existingPersonalScoresStr)
      : [];

    // Keep track of top 5 personal scores per mode
    personalScores = personalScores
      .filter((s) => s.mode === mode)
      .concat(newScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    await redis.set(personalKey, JSON.stringify(personalScores));

    // Update global leaderboard
    const leaderboardEntries = await redis.zRange(LEADERBOARD_KEY, 0, -1, {
      by: "score",
      reverse: false,
    });

    const lowestLeaderboardScore = leaderboardEntries.length
      ? leaderboardEntries[leaderboardEntries.length - 1].score
      : 0;

    // Only add to leaderboard if score is higher than the lowest current score
    if (score > lowestLeaderboardScore) {
      await redis.zAdd(LEADERBOARD_KEY, {
        score,
        member: JSON.stringify({
          username,
          score,
          mode,
          correct,
          streak,
        }),
      });

      // Trim leaderboard to top 10
      const totalEntries = await redis.zCard(LEADERBOARD_KEY);
      if (totalEntries > MAX_LEADERBOARD_ENTRIES) {
        await redis.zRemRangeByRank(
          LEADERBOARD_KEY,
          0,
          -(MAX_LEADERBOARD_ENTRIES + 1)
        );
      }
    }
  } catch (error) {
    console.error("Error storing score:", error);
  }
}

export async function fetchLeaderboard(context: Devvit.Context) {
  const { redis, userId } = context;
  try {
    // Fetch global leaderboard
    const leaderboardEntries = await redis.zRange(LEADERBOARD_KEY, 0, -1, {
      by: "score",
      reverse: true,
    });

    const leaderboard = leaderboardEntries
      .map((entry, index) => ({
        ...JSON.parse(entry.member),
        rank: index + 1,
        score: entry.score,
      }))
      .slice(0, MAX_LEADERBOARD_ENTRIES);

    // Fetch user's personal scores
    let myScore = 0;
    if (userId) {
      const personalKey = `${PERSONAL_SCORE_PREFIX}${userId}`;
      const personalScoresStr = await redis.get(personalKey);

      if (personalScoresStr) {
        const personalScores = JSON.parse(personalScoresStr);
        // Get highest score for current user
        myScore = personalScores.reduce(
          (max: { score: number }, score: { score: number }) =>
            score.score > max.score ? score.score : max,
          { score: 0 }
        );
      }
    }

    return { leaderboard, myScore };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { leaderboard: [], myScore: 0 };
  }
}
