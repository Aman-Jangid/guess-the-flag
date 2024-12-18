import { Devvit, useState } from "@devvit/public-api";

type PageProps = {
  context: Devvit.Context;
  setPage: (page: string) => void;
  score: number;
  streak: number;
  correct: number;
  incorrect: number;
  lives: number;
  mode: "timer" | "streak";
  storeScore: (score: number) => void;
};

const GameOver = ({
  context,
  score,
  correct,
  incorrect,
  lives,
  streak,
  setPage,
  mode,
  storeScore,
}: PageProps) => {
  const [bestScore, setBestScore] = useState<number>(0);
  const [newRank, setNewRank] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  const fetchGameStats = async () => {
    try {
      // Store the current score
      await storeScore(score);

      // Fetch best score from Redis
      const storedBestScore =
        (await context.kvStore.get<number>("bestScore")) || 0;
      const currentBestScore = Math.max(storedBestScore, score);

      // Update best score if current score is higher
      if (currentBestScore > storedBestScore) {
        await context.kvStore.put("bestScore", currentBestScore);
      }
      setBestScore(currentBestScore);

      // Fetch or calculate rank
      const userScores = await context.kvStore.list();
      const sortedScores = userScores
        .map((key) => parseInt(key.split(":")[1], 10))
        .sort((a, b) => b - a);

      const userRank = sortedScores.indexOf(score) + 1;
      setNewRank(userRank);

      // Fetch username (assumes it's stored separately)
      const storedUsername =
        (await context.kvStore.get<string>("username")) || "Strking-Coyote123";
      setUsername(storedUsername);
    } catch (error) {
      console.error("Error fetching game stats:", error);
    }
  };

  fetchGameStats();

  return (
    <vstack height={100} width={100} alignment="middle center" gap="small">
      <vstack height={70} width={100} alignment="middle center">
        <text size="xxlarge" style="heading" weight="bold">{`Game Over!`}</text>
        <spacer size="large" />
        <vstack height={60} width={100} alignment="middle center" gap="small">
          <text
            alignment="center middle"
            size="xxlarge"
            weight="bold"
            color="orangered"
          >{`Your Score: ${score}`}</text>
          <text weight="bold">{`Best score: ${bestScore}`}</text>
          {mode === "timer" && <text>{`Longest Streak: ${streak}`}</text>}
          {mode === "streak" && (
            <vstack alignment="middle center" gap="small">
              <hstack alignment="middle center" gap="small" width={100}>
                <icon name="heart-fill" color="red" size="small" />
                <text weight="bold">{`remaining: ${lives}`}</text>
              </hstack>
              <hstack alignment="middle center" gap="small" width={100}>
                <image url="streak.png" imageHeight={20} imageWidth={20} />
                <text weight="bold">{`Streak: ${streak}`}</text>
              </hstack>
            </vstack>
          )}
          {mode === "timer" && (
            <>
              <text>{`Correct answers: ${correct}`}</text>
              <text>{`Wrong answers: ${incorrect}`}</text>
            </>
          )}
          <spacer size="medium" />
          <hstack
            alignment="middle center"
            gap="small"
            cornerRadius="small"
            border="thin"
            width={100}
          >
            <text>{`Rank: ${newRank}`}</text>
            <text color="#0045AB">{username}</text>
            <hstack alignment="middle center" padding="small" gap="small">
              <text>rank up </text>
              <icon size="small" name="upvote-fill" color="orangered" />
            </hstack>
          </hstack>
        </vstack>
      </vstack>
      <vstack alignment="middle center" height={30} width={100} gap="small">
        <button
          width={100}
          onPress={() => {
            setPage("a");
          }}
        >
          Go Home
        </button>
        <button
          width={100}
          appearance="primary"
          onPress={() => {
            setPage("b");
          }}
        >
          Play Again
        </button>
      </vstack>
    </vstack>
  );
};

export default GameOver;
