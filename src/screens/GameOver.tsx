import { Devvit } from "@devvit/public-api";

type PageProps = {
  setPage: (page: string) => void;
  score: number;
  streak: number;
  correct: number;
  incorrect: number;
  lives: number;
  mode: "timer" | "streak";
};

const GameOver = ({
  score,
  correct,
  incorrect,
  lives,
  streak,
  setPage,
  mode,
}: PageProps) => {
  // fetch the best score from the redis database
  // fetch the new rank from the redis database
  const bestScore = 0;
  const newRank = 0;

  return (
    <vstack height={100} width={100} grow alignment="middle center">
      <vstack height={50} width={100} alignment="middle center" gap="small">
        {/* use an image instead of Game Over text */}
        <text size="xxlarge">{`Game Over!`}</text>
        <hstack width={50} height={20} gap="small" alignment="middle center">
          <icon name="star-fill" size="medium" />
          <icon name="star-fill" size="medium" />
          <icon name="star-outline" size="medium" />
        </hstack>
        <text>{`Your Score: ${score}`}</text>
        <text>{`Best score: ${bestScore}`}</text>
        <text>{`Longest Streak: ${streak}`}</text>
        <text>{`New Rank: ${newRank}`}</text>
        {mode === "streak" && (
          <>
            <text>{`Lives remaining: ${lives}`}</text>
            <text>{`Streak: ${streak}`}</text>
          </>
        )}
        {mode === "timer" && (
          <>
            <text>{`Correct answers: ${correct}`}</text>
            <text>{`Wrong answers: ${incorrect}`}</text>
          </>
        )}
      </vstack>
      <vstack alignment="middle center" width={100} gap="small">
        <button
          width={100}
          onPress={() => {
            setPage("a");
          }}
        >
          Go Home
        </button>
        <button
          width={100}
          onPress={() => {
            setPage("b");
          }}
        >
          Play Again
        </button>
      </vstack>
    </vstack>
  );
};

export default GameOver;
