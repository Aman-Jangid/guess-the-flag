import { Devvit, useState } from "@devvit/public-api";

import GameBoard from "./screens/GameBoard.js";
import Home from "./screens/Home.js";
import Leaderboard from "./screens/Leaderboard.js";
import GameOptions from "./screens/GameOptions.js";
import GameOver from "./screens/GameOver.js";
import Credits from "./screens/Credits.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: "New Guess The Flag Post",
  location: ["subreddit", "post"],
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast(
      "Submitting your post - upon completion you'll navigate there."
    );

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: "Guess The Flag!",
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <image url="load.jpg" imageHeight={120} imageWidth={120} />
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

type optionType = "timer" | "streak";

// Add a post type definition
Devvit.addCustomPostType({
  // name: "Experience Post",
  name: "Guess The Flag!",
  height: "tall",
  description: "A fun game to guess the flags of countries.",
  render: (_context) => {
    const [page, setPage] = useState<string>("d");
    const [mode, setMode] = useState<optionType>("streak");
    const [score, setScore] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [correct, setCorrect] = useState<number>(0);
    const [incorrect, setIncorrect] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);

    const startGame = () => {
      setMode(mode);
      setScore(0);
      setStreak(0);
      setCorrect(0);
      setIncorrect(0);
      setLives(3);
      setPage("c");
    };

    let currentPage;
    switch (page) {
      case "a":
        currentPage = <Home setPage={setPage} />;
        break;
      case "b":
        currentPage = (
          <GameOptions
            startGame={startGame}
            mode={mode}
            setMode={setMode}
            setPage={setPage}
          />
        );
        break;
      case "c":
        currentPage = (
          <GameBoard
            setPage={setPage}
            mode={mode}
            setScore={setScore}
            score={score}
            streak={streak}
            setStreak={setStreak}
            correct={correct}
            setCorrect={setCorrect}
            incorrect={incorrect}
            setIncorrect={setIncorrect}
            lives={lives}
            setLives={setLives}
          />
        );
        break;
      case "d":
        currentPage = (
          <GameOver
            setPage={setPage}
            score={score}
            correct={correct}
            incorrect={incorrect}
            lives={lives}
            mode={mode}
            streak={streak}
          />
        );
        break;
      case "e":
        currentPage = <Leaderboard setPage={setPage} />;
        break;
      case "f":
        currentPage = <Credits setPage={setPage} />;
      default:
        currentPage = <Home setPage={setPage} />;
    }

    return (
      <vstack height="100%" gap="medium" alignment="center middle">
        <vstack width={"300px"} height={100}>
          {currentPage}
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
