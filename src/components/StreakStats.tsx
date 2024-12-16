import { Devvit } from "@devvit/public-api";

const StreakStats = ({ streak }: { streak: number }) => (
  <>
    <hstack
      height={100}
      width={40}
      backgroundColor=""
      border="thick"
      cornerRadius="small"
      alignment="middle center"
    >
      <text size="large" weight="bold" color="orange">
        {streak}
      </text>
      <text size="large">/256</text>
    </hstack>
    <vstack height={100} grow />
    <hstack height={100} width={40} alignment="middle center" gap="small">
      <image url="streak.png" imageHeight={20} imageWidth={20} />
      <text size="large" color="white">
        {streak}
      </text>
    </hstack>
  </>
);

export default StreakStats;
