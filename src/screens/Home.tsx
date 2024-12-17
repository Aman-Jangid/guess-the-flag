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
    <image url={"icon.png"} imageHeight={240} imageWidth={240} />
    <button
      width={90}
      appearance={"primary"}
      icon={"activity"}
      onPress={() => setPage("b")}
    >
      Play
    </button>
    <button
      width={90}
      appearance={"bordered"}
      icon={"top"}
      onPress={() => setPage("e")}
    >
      Leaderboard
    </button>
  </vstack>
);

export default Home;
