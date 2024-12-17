import { Devvit } from "@devvit/public-api";

interface LeaderboardHeaderProps {
  setPage: (page: string) => void;
}

export const LeaderboardHeader = ({ setPage }: LeaderboardHeaderProps) => (
  <hstack
    alignment="center middle"
    cornerRadius="small"
    width={100}
    height={12}
    gap="medium"
  >
    <vstack height={50} width={50} alignment="start middle">
      <text size="large" weight="bold">
        Leaderboard
      </text>
    </vstack>
    <vstack height={50} width={40} alignment="end middle">
      <icon name="close" size="medium" onPress={() => setPage("a")} />
    </vstack>
  </hstack>
);
