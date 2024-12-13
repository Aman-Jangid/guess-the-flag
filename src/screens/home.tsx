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
    <image url={""} imageHeight={100} imageWidth={160} />
    <text size="xxlarge">Guess The Flag!</text>
    <button
      width={70}
      appearance={"success"}
      icon={"activity"}
      onPress={() => setPage("b")}
    >
      Play !
    </button>
    <button
      width={70}
      appearance={"bordered"}
      icon={"top"}
      onPress={() => setPage("b")}
    >
      Leaderboard
    </button>
  </vstack>
);

export default Home;
