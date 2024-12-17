import { Devvit } from "@devvit/public-api";

interface LeaderboardRowProps {
  data: {
    name: string;
    score: number;
    rank: number;
    id: number;
  };
}

export const LeaderboardRow = ({ data }: LeaderboardRowProps) => (
  <hstack key={data.id.toString()} gap="small">
    <vstack height={100} width={20} alignment="center middle">
      <text size="medium" color="white">
        {data.rank}
      </text>
    </vstack>
    <vstack height={100} width={50} alignment="start middle">
      <text size="medium" color="#0045AB">
        {data.name}
      </text>
    </vstack>
    <vstack height={100} width={30} alignment="start middle">
      <text size="medium" color="white">
        {data.score}
      </text>
    </vstack>
  </hstack>
);
