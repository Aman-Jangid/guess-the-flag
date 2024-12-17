import { Devvit } from "@devvit/public-api";

type PageProps = {
  setPage: (page: string) => void;
  score: number;
};

const GameOver = ({ score, setPage }: PageProps) => {
  return (

    <vstack height={100} width={100} grow alignment="middle center">
      <vstack height={50} width={100} alignment="middle center" gap="small"  >
        {/* use an image instead of Game Over text */}
        <text size="xxlarge">{`Game Over!`}</text>
        <hstack width={50} height={20} gap="small" alignment="middle center">
          <icon name="star-fill" size="medium" />
          <icon name="star-fill" size="medium" />
          <icon name="star-outline" size="medium" />
        </hstack>
        <text>{`Score: ${score}`}</text>
        <text>{`Best score: ${score}`}</text>
        <text>{`New Rank: ${score}`}</text>

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
