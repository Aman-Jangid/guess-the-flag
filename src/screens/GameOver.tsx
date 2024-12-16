// a gameover screen that shows the score and a button to restart the game

import { Devvit } from "@devvit/public-api";

type PageProps = {
  setPage: (page: string) => void;
  score: number;
};

const GameOver = ({ score, setPage }: PageProps) => {
  return (
    <vstack height="100%" width="100%" alignment="middle center">
      <text>{`Your score: ${score}`}</text>
      <button
        onPress={() => {
          setPage("a");
        }}
      >
        Go Home
      </button>
      <button
        onPress={() => {
          setPage("b");
        }}
      >
        Play Again
      </button>
    </vstack>
  );
};

export default GameOver;
