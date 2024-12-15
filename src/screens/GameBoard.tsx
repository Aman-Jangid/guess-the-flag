import { Devvit, IconName, useInterval, useState } from "@devvit/public-api";
import countries from "../data/data.json" assert { type: "json" };

type PageProps = {
  setPage: (page: string) => void;
  mode: "timer" | "streak";
};

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// Format time in MM:SS format
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

const GameBoard = ({ setPage, mode }: PageProps) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer
  const [options, setOptions] = useState<string[]>([]); // Shuffled options
  const [answer, setAnswer] = useState<string>(""); // Correct answer
  const [flagUrl, setFlagUrl] = useState<string>(""); // Flag image URL
  const [streak, setStreak] = useState<number>(0); // Streak counter
  const [correct, setCorrect] = useState<number>(0); // Correct counter
  const [incorrect, setIncorrect] = useState<number>(0); // Incorrect counter
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Generate options for the current question
  const generateOptions = () => {
    const countryCodes = Object.keys(countries);
    const randomAnswerIndex = Math.floor(Math.random() * countryCodes.length);
    const answerCode = countryCodes[randomAnswerIndex];
    const answerCountry = countries[answerCode].country;

    const randomOptions: string[] = [];
    while (randomOptions.length < 2) {
      const randomIndex = Math.floor(Math.random() * countryCodes.length);
      const optionCountry = countries[countryCodes[randomIndex]].country;
      if (
        optionCountry !== answerCountry &&
        !randomOptions.includes(optionCountry)
      ) {
        randomOptions.push(optionCountry);
      }
    }

    const allOptions = shuffleArray([answerCountry, ...randomOptions]);
    setAnswer(answerCountry);
    setFlagUrl(countries[answerCode].flag);
    setOptions(allOptions);
  };

  // Handle timer logic for Timer Mode
  if (mode === "timer") {
    useInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        endGame();
      }
    }, 1000).start();
  }

  // Handle option click
  const handleOptionClick = (option: string) => {
    if (option === answer) {
      setCorrect((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      generateOptions();
    } else {
      if (mode === "streak") {
        endGame();
      } else if (mode === "timer") {
        setIncorrect((prev) => prev + 1);
        generateOptions();
      }
    }
  };

  // End the game
  const endGame = () => {
    setGameOver(true);
    setPage("d");
  };

  // Initialize options on first render
  useState(() => {
    generateOptions();
  }, []);

  return (
    <vstack
      width="100%"
      height="100%"
      alignment="center"
      backgroundColor="#0B1315"
      lightBackgroundColor="#FEFFFE"
    >
      <spacer size="small" />
      {/* Stats Section */}
      <hstack
        alignment="center middle"
        cornerRadius="small"
        width={90}
        height={10}
        gap="small"
      >
        {mode === "streak" ? (
          <StreakStats streak={streak} />
        ) : (
          <TimerStats
            correct={correct}
            incorrect={incorrect}
            timeLeft={timeLeft}
          />
        )}
      </hstack>
      <spacer size="small" />
      {/* Flag Section */}
      <vstack height={36} width={90} alignment="middle center">
        <image url={flagUrl} imageHeight={150} imageWidth={150} />
      </vstack>
      <spacer size="small" />
      {/* Options Section */}
      <vstack
        height={38}
        width={90}
        alignment="middle center"
        cornerRadius="small"
        gap="small"
      >
        {options.map((option, index) => (
          <button
            key={index.toString()}
            width={100}
            maxHeight={33}
            appearance="secondary"
            onPress={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </vstack>
    </vstack>
  );
};

// Timer Stats Component
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

// Streak Stats Component
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

// Stat Component
const Stat = ({
  icon,
  value,
  color,
}: {
  icon: string;
  value: number;
  color: string;
}) => (
  <hstack gap="small" alignment="middle center">
    <icon name={icon as IconName} height={20} color={color} />
    <text size="large" weight="bold" color={color}>
      {value}
    </text>
  </hstack>
);

export default GameBoard;
