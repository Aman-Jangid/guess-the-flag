import { Devvit } from "@devvit/public-api";

interface PageProps {
  setPage: (page: string) => void;
}

const Home = ({ setPage }: PageProps) => (
  <vstack
    width="100%"
    height="100%"
    alignment="middle center"
    gap="medium"
    backgroundColor="#0B1315"
    lightBackgroundColor="#FEFFFE"
  >
    <image url={"icon.png"} imageHeight={180} imageWidth={180} />
    <button
      width={70}
      appearance={"primary"}
      icon={"activity"}
      onPress={() => setPage("b")}
    >
      Play
    </button>
    <button
      width={70}
      appearance={"bordered"}
      icon={"top"}
      onPress={() => setPage("e")}
    >
      Leaderboard
    </button>
  </vstack>
);

export default Home;
