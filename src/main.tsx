// Learn more at developers.reddit.com/docs
import { Devvit, useState } from "@devvit/public-api";
import GameBoard from "./screens/gameboard.js";
import Home from "./screens/home.js";
import Leaderboard from "./screens/leaderboard.js";

Devvit.configure({
  redditAPI: true,
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
      title: "My devvit post",
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  // name: "Experience Post",
  name: "Guess The Flag!",
  height: "regular",
  description: "A fun game to guess the flags",
  render: (_context) => {
    const [page, setPage] = useState("a");

    let currentPage;
    switch (page) {
      case "a":
        currentPage = <Home setPage={setPage} />;
        break;
      case "b":
        currentPage = <GameBoard setPage={setPage} />;
        break;
      case "c":
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
