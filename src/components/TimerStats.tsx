import { Devvit } from "@devvit/public-api";
import Stat from "./Stat.js";
import formatTime from "../utils/formatTime.js";

const TimerStats = ({
  correct,
  incorrect,
  timeLeft,
}: {
  correct: number;
  incorrect: number;
  timeLeft: number;
}) => (
  <>
    <hstack
      height={100}
      width={50}
      backgroundColor=""
      border="thick"
      cornerRadius="small"
      alignment="middle center"
      gap="small"
    >
      <Stat icon="checkmark" value={correct} color="yellowgreen" />
      <vstack height={100} width={1} border="thin" />
      <Stat icon="close" value={incorrect} color="orangered" />
    </hstack>
    <vstack height={100} grow />
    <hstack height={100} width={40} alignment="middle center" gap="small">
      <image url="timer.png" imageHeight={20} imageWidth={20} />
      <text size="large" color="white" weight="bold">
        {formatTime(timeLeft)}
      </text>
    </hstack>
  </>
);

export default TimerStats;