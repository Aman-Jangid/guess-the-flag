// import { Devvit } from "@devvit/public-api";
// import { LeaderboardHeader } from "../components/LeaderboardHeader.js";
// import { LeaderboardRow } from "../components/LeaderboardRow.js";
// import { LeaderboardFooter } from "../components/LeaderboardFooter.js";

// interface PageProps {
//   setPage: (page: string) => void;
//   leaderboard: any[];
//   fetchLeaderboard: () => void;
//   myScore: number;
// }

// const Leaderboard = ({
//   setPage,
//   leaderboard,
//   fetchLeaderboard,
//   myScore,
// }: PageProps) => {
//   fetchLeaderboard();

//   let you = myScore;
//   return (
//     <vstack
//       width="100%"
//       height="100%"
//       alignment="center"
//       gap="small"
//       backgroundColor="#0B1315"
//       lightBackgroundColor="#FEFFFE"
//     >
//       <LeaderboardHeader setPage={setPage} />
//       <vstack
//         height={80}
//         width={90}
//         cornerRadius="small"
//         padding="medium"
//         gap="small"
//       >
//         <hstack>
//           <vstack height={100} width={20} alignment="start middle">
//             <text
//               alignment="center middle"
//               size="medium"
//               weight="bold"
//               color="orange"
//             >
//               Rank
//             </text>
//           </vstack>
//           <vstack height={100} width={50} alignment="start middle">
//             <text
//               alignment="center middle"
//               size="medium"
//               weight="bold"
//               color="white"
//             >
//               Name
//             </text>
//           </vstack>
//           <vstack height={100} width={30} alignment="start middle">
//             <text
//               alignment="center middle"
//               size="medium"
//               weight="bold"
//               color="white"
//             >
//               Score
//             </text>
//           </vstack>
//         </hstack>
//         {leaderboard.map((data) => (
//           <LeaderboardRow data={data} />
//         ))}
//         <LeaderboardFooter data={you} />
//       </vstack>
//     </vstack>
//   );
// };

// export default Leaderboard;

import { Devvit } from "@devvit/public-api";

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
  return (
    <vstack gap="medium" alignment="center" grow>
      <text size="large" weight="bold" color="orange">
        Global Leaderboard
      </text>

      <button onPress={() => fetchLeaderboard()} appearance="secondary">
        Refresh Leaderboard
      </button>

      <vstack gap="small" width="100%" padding="medium">
        <text weight="bold">My Best Score: {myScore}</text>

        {leaderboard.length === 0 ? (
          <text>No scores yet. Be the first!</text>
        ) : (
          leaderboard.map((entry, index) => (
            <hstack key={entry.username} gap="small" alignment="center">
              <text weight="bold" width={"30px"}>
                #{entry.rank}
              </text>
              <text grow>{entry.username}</text>
              <text>{entry.score} pts</text>
              <text color="gray" size="small">
                {entry.mode}
              </text>
            </hstack>
          ))
        )}
      </vstack>

      <button onPress={() => setPage("a")} appearance="primary">
        Back to Home
      </button>
    </vstack>
  );
}
