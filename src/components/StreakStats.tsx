import { Devvit } from "@devvit/public-api";

const StreakStats = ({ streak, lives }: { streak: number; lives: number }) => {
  const hearts = Array.from({ length: lives }, (_, i) => i);
  const emptyHearts = Array.from({ length: 3 - lives }, (_, i) => i);

  return (
    <>
      <hstack
        height={100}
        width={40}
        backgroundColor=""
        cornerRadius="small"
        gap="small"
        alignment="middle center"
      >
        {hearts.map((_, i) => (
          <icon key={i.toString()} name={"heart-fill"} color="red" />
        ))}
        {emptyHearts.map((_, i) => (
          <icon key={i.toString()} name={"heart"} color="red" />
        ))}
      </hstack>
      <vstack height={100} grow />
      <hstack height={100} width={40} alignment="middle center" gap="small">
        <image url="streak.png" imageHeight={20} imageWidth={20} />
        <text
          size="large"
          lightColor="#0A1315"
          darkColor="#E5EBEE"
          weight="bold"
        >
          {streak}
        </text>
      </hstack>
    </>
  );
};

export default StreakStats;
