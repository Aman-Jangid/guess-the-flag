import { Devvit } from "@devvit/public-api";
import { LeaderboardHeader } from "../components/LeaderboardHeader.js";
import { LeaderboardRow } from "../components/LeaderboardRow.js";
import { LeaderboardFooter } from "../components/LeaderboardFooter.js";

interface PageProps {
  setPage: (page: string) => void;
}

const dummyData = [
  { name: "John Doe", score: 1000, rank: 1, id: 1 },
  { name: "Jane Doe", score: 900, rank: 2, id: 2 },
  { name: "Alice Doe", score: 800, rank: 3, id: 3 },
  { name: "Bob Doe", score: 700, rank: 4, id: 4 },
  { name: "Charlie Doe", score: 600, rank: 5, id: 5 },
  { name: "David Doe", score: 500, rank: 6, id: 6 },
  { name: "Eve Doe", score: 400, rank: 7, id: 7 },
  { name: "Frank Doe", score: 300, rank: 8, id: 8 },
  { name: "Grace Doe", score: 200, rank: 9, id: 9 },
  { name: "Hank Doe", score: 100, rank: 10, id: 10 },
];

const you = { name: "You", score: 30, rank: 89, id: 89 };

const Leaderboard = ({ setPage }: PageProps) => (
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
      {dummyData.map((data) => (
        <LeaderboardRow data={data} />
      ))}
      <LeaderboardFooter data={you} />
    </vstack>
  </vstack>
);

export default Leaderboard;
