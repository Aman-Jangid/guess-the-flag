import { Devvit } from "@devvit/public-api";

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
    <hstack
      alignment={"center middle"}
      cornerRadius={"small"}
      width={100}
      height={18}
      gap={"medium"}
    >
      <vstack
        height={50}
        width={50}
        backgroundColor=""
        alignment="start middle"
        cornerRadius={"small"}
      >
        <text size={"large"} weight={"bold"} color={"white"}>
          Leaderboard
        </text>
      </vstack>
      <vstack
        height={50}
        width={40}
        backgroundColor=""
        alignment="end middle"
        cornerRadius={"small"}
      >
        <icon
          name="close"
          size="medium"
          color="white"
          onPress={() => setPage("a")}
        />
      </vstack>
    </hstack>
    <vstack
      height={80}
      width={90}
      backgroundColor=""
      border={"thick"}
      cornerRadius={"small"}
      borderColor={"white"}
    >
      <hstack>
        <vstack
          height={100}
          width={20}
          backgroundColor=""
          alignment="start middle"
          cornerRadius={"small"}
        >
          <text size={"small"} weight={"bold"} color={"orange"}>
            Rank
          </text>
        </vstack>
        <vstack
          height={100}
          width={50}
          backgroundColor=""
          alignment="start middle"
          cornerRadius={"small"}
        >
          <text size={"small"} weight={"bold"} color={"white"}>
            Name
          </text>
        </vstack>
        <vstack
          height={100}
          width={30}
          backgroundColor=""
          alignment="start middle"
          cornerRadius={"small"}
        >
          <text size={"small"} weight={"bold"} color={"green"}>
            Score
          </text>
        </vstack>
      </hstack>
      {dummyData.map((data) => (
        <hstack key={data.id.toString()}>
          <vstack
            height={100}
            width={20}
            backgroundColor=""
            alignment="center middle"
            cornerRadius={"small"}
          >
            <text size={"small"} color={"white"}>
              {data.rank}
            </text>
          </vstack>
          <vstack
            height={100}
            width={50}
            backgroundColor=""
            alignment="start middle"
            cornerRadius={"small"}
          >
            <text size={"small"} color={"white"}>
              {data.name}
            </text>
          </vstack>
          <vstack
            height={100}
            width={30}
            backgroundColor=""
            alignment="start middle"
            cornerRadius={"small"}
          >
            <text size={"small"} color={"white"}>
              {data.score}
            </text>
          </vstack>
        </hstack>
      ))}
      <hstack
        backgroundColor="blue"
        width={100}
        height={10}
        alignment="center middle"
        cornerRadius={"small"}
        border="thick"
        borderColor="white"
      >
        <vstack
          height={100}
          width={20}
          backgroundColor=""
          alignment="center middle"
          cornerRadius={"small"}
        >
          <text size={"small"} color={"white"}>
            {you.rank}
          </text>
        </vstack>
        <vstack
          height={100}
          width={50}
          backgroundColor=""
          alignment="start middle"
          cornerRadius={"small"}
        >
          <text size={"small"} color={"white"}>
            {you.name}
          </text>
        </vstack>
        <vstack
          height={100}
          width={30}
          backgroundColor=""
          alignment="start middle"
          cornerRadius={"small"}
        >
          <text size={"small"} color={"white"}>
            {you.score}
          </text>
        </vstack>
      </hstack>
    </vstack>
  </vstack>
);

export default Leaderboard;
