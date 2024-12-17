import { Devvit } from "@devvit/public-api";

interface LeaderboardFooterProps {
  data: {
    name: string;
    score: number;
    rank: number;
    id: number;
  };
}

export const LeaderboardFooter = ({ data }: LeaderboardFooterProps) => (
  <hstack
    backgroundColor="#D83900"
    width={100}
    height={10}
    alignment="center middle"
    cornerRadius="small"
    border="thick"
    borderColor="white"
  >
    <vstack height={100} width={20} alignment="center middle">
      <text weight="bold" size="medium" color="white">
        {data.rank}
      </text>
    </vstack>
    <vstack height={100} width={50} alignment="start middle">
      <text weight="bold" size="medium" color="white">
        {data.name}
      </text>
    </vstack>
    <vstack height={100} width={30} alignment="start middle">
      <text weight="bold" size="medium" color="white">
        {data.score}
      </text>
    </vstack>
  </hstack>
);
