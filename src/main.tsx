// Learn more at developers.reddit.com/docs
import { Devvit, useState } from "@devvit/public-api";

import GameBoard from "./screens/GameBoard.js";
import Home from "./screens/Home.js";
import Leaderboard from "./screens/Leaderboard.js";
import GameOptions from "./screens/GameOptions.js";

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
          <image url="gtf.jpg" imageHeight={100} imageWidth={100} />
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
  height: "regular",
  description: "A fun game to guess the flags of countries.",
  render: (_context) => {
    const [page, setPage] = useState<string>("a");
    const [mode, setMode] = useState<optionType>("timer");

    let currentPage;
    switch (page) {
      case "a":
        currentPage = <Home setPage={setPage} />;
        break;
      case "b":
        currentPage = (
          <GameOptions setPage={setPage} setMode={setMode} mode={mode} />
        );
        break;
      case "c":
        currentPage = <GameBoard setPage={setPage} mode={mode} />;
        break;
      case "d":
        currentPage = <Leaderboard setPage={setPage} />;
        break;
      default:
        currentPage = <Home setPage={setPage} />;
    }

    return (
      <vstack height="100%" gap="medium" alignment="center middle">
        <vstack width={"260px"} height={100}>
          {currentPage}
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
