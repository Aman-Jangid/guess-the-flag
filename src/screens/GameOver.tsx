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
  const bestScore = 3151;
  const newRank = 4;

  return (
    <vstack height={100} width={100} alignment="middle center">
      <vstack height={60} width={100} alignment="middle center">
        <text size="xxlarge">{`Game Over!`}</text>
        <vstack height={60} width={100} alignment="middle center" gap="small">
          <text
            alignment="center middle"
            size="xlarge"
            weight="bold"
            color="orangered"
          >{`Your Score: ${score}`}</text>
          <hstack
            alignment="middle center"
            gap="small"
            cornerRadius="small"
            border="thin"
            width={100}
          >
            <text>{`Rank: ${newRank}`}</text>
            <text color="#0045AB">Strking-Coyote123</text>
            <hstack alignment="middle center" padding="small" gap="small">
              <text>rank up </text>
              <icon size="small" name="upvote-fill" color="orangered" />
            </hstack>
          </hstack>

          <text>{`Best score: ${bestScore}`}</text>
          {mode === "timer" && <text>{`Longest Streak: ${streak}`}</text>}
        </vstack>
        {mode === "streak" && (
          <vstack alignment="middle center" gap="small">
            <hstack alignment="middle center" gap="small" width={100}>
              <icon name="heart-fill" color="red" size="small" />
              <text weight="bold">{`remaining: ${lives}`}</text>
            </hstack>
            <hstack alignment="middle center" gap="small" width={100}>
              <image url="streak.png" imageHeight={20} imageWidth={20} />
              <text weight="bold">{`Streak: ${streak}`}</text>
            </hstack>
          </vstack>
        )}
        {mode === "timer" && (
          <>
            <text>{`Correct answers: ${correct}`}</text>
            <text>{`Wrong answers: ${incorrect}`}</text>
          </>
        )}
      </vstack>
      <vstack alignment="middle center" height={30} width={100} gap="small">
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
          appearance="primary"
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
