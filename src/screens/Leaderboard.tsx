import { Devvit } from "@devvit/public-api";
import { LeaderboardHeader } from "../components/LeaderboardHeader.js";
import { LeaderboardRow } from "../components/LeaderboardRow.js";
import { LeaderboardFooter } from "../components/LeaderboardFooter.js";

interface PageProps {
  setPage: (page: string) => void;
  leaderboard: any[];
  fetchLeaderboard: () => void;
  myScore: number;
}

const Leaderboard = ({
  setPage,
  leaderboard,
  fetchLeaderboard,
  myScore,
}: PageProps) => {
  fetchLeaderboard();

  let you = myScore;
  return (
    <vstack
      width="100%"
      height="100%"
      alignment="center"
      gap="small"
      backgroundColor="#0B1315"
      lightBackgroundColor="#FEFFFE"
    >
      <LeaderboardHeader setPage={setPage} />
      <vstack
        height={80}
        width={90}
        cornerRadius="small"
        padding="medium"
        gap="small"
      >
        <hstack>
          <vstack height={100} width={20} alignment="start middle">
            <text
              alignment="center middle"
              size="medium"
              weight="bold"
              color="orange"
            >
              Rank
            </text>
          </vstack>
          <vstack height={100} width={50} alignment="start middle">
            <text
              alignment="center middle"
              size="medium"
              weight="bold"
              color="white"
            >
              Name
            </text>
          </vstack>
          <vstack height={100} width={30} alignment="start middle">
            <text
              alignment="center middle"
              size="medium"
              weight="bold"
              color="white"
            >
              Score
            </text>
          </vstack>
        </hstack>
        {leaderboard.map((data) => (
          <LeaderboardRow data={data} />
        ))}
        <LeaderboardFooter data={you} />
      </vstack>
    </vstack>
  );
};

export default Leaderboard;
