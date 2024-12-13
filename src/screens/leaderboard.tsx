import { Devvit } from "@devvit/public-api";

interface PageProps {
  setPage: (page: string) => void;
}

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
        width={70}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"white"}
      />
      <vstack
        height={50}
        width={20}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"white"}
      />
    </hstack>
    <vstack
      height={80}
      width={90}
      backgroundColor=""
      border={"thick"}
      cornerRadius={"small"}
      borderColor={"white"}
    />
  </vstack>
);

export default Leaderboard;
