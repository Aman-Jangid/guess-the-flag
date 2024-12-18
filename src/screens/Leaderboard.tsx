import { Devvit, useState } from "@devvit/public-api";

export function Leaderboard({
  leaderboard,
  myScore,
  fetchLeaderboard,
  setPage,
}: {
  leaderboard: any[];
  myScore: number;
  fetchLeaderboard: () => Promise<void>;
  setPage: (page: string) => void;
}) {
  const [activeMode, setActiveMode] = useState<"timer" | "streak">("timer");

  // Filter leaderboard by active mode
  const filteredLeaderboard = leaderboard
    .filter((entry) => entry.mode === activeMode)
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  fetchLeaderboard();

  return (
    <vstack
      width="100%"
      height="100%"
      alignment="center"
      gap="small"
      backgroundColor="#0B1315"
    >
      <vstack width="100%" padding="medium" gap="medium">
        <hstack alignment="center middle" gap="medium">
          <button
            onPress={() => setActiveMode("timer")}
            appearance={activeMode === "timer" ? "primary" : "secondary"}
          >
            Timer Mode
          </button>
          <button
            onPress={() => setActiveMode("streak")}
            appearance={activeMode === "streak" ? "primary" : "secondary"}
          >
            Streak Mode
          </button>
        </hstack>

        <vstack
          width="100%"
          backgroundColor="#1A2A33"
          cornerRadius="medium"
          padding="medium"
        >
          <hstack>
            <text width={20} weight="bold" color="orange">
              Rank
            </text>
            <text width={50} weight="bold" color="white">
              Name
            </text>
            <text width={30} weight="bold" color="white">
              Score
            </text>
          </hstack>

          {filteredLeaderboard.length > 0 ? (
            filteredLeaderboard.map((entry) => (
              <hstack key={entry.username}>
                <text width={20} weight="bold" color="white">
                  {entry.rank}
                </text>
                <text width={50} weight="bold" color="#0045ab">
                  {entry.username}
                </text>
                <text width={30} weight="bold" color="white">
                  {entry.score}
                </text>
              </hstack>
            ))
          ) : (
            <text color="gray">No scores yet in this mode</text>
          )}
        </vstack>

        <vstack
          width="100%"
          backgroundColor="#D83900"
          cornerRadius="medium"
          padding="medium"
          alignment="center middle"
        >
          <text color="white" weight="bold">
            My Best Score: {myScore}
          </text>
        </vstack>

        <button onPress={() => setPage("a")} appearance="secondary">
          Back to Home
        </button>
      </vstack>
    </vstack>
  );
}
