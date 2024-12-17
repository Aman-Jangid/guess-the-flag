import { Devvit, IconName, useInterval, useState } from "@devvit/public-api";

import TimerStats from "../components/TimerStats.js";
import StreakStats from "../components/StreakStats.js";

import countriesData from "../data/data.json" assert { type: "json" };

const countries = countriesData as Record<string, CountryType>;

type CountryType = {
  country: string;
  flag: string;
};

type PageProps = {
  setPage: (page: string) => void;
  mode: "timer" | "streak";
  setScore?: (score: number) => void;
};

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// Format time in MM:SS format

const GameBoard = ({ setPage, mode }: PageProps) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer
  const [options, setOptions] = useState<string[]>([]); // Shuffled options
  const [answer, setAnswer] = useState<string>(""); // Correct answer
  const [flagUrl, setFlagUrl] = useState<string>(""); // Flag image URL
  const [streak, setStreak] = useState<number>(0); // Streak counter
  const [correct, setCorrect] = useState<number>(0); // Correct counter
  const [incorrect, setIncorrect] = useState<number>(0); // Incorrect counter
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  // for testing
  const [green, setGreen] = useState<boolean>(false);
  const [red, setRed] = useState<boolean>(false);

  // Generate options for the current question
  const generateOptions = () => {
    const countryCodes = Object.keys(countries);
    const randomAnswerIndex = Math.floor(Math.random() * countryCodes.length);
    const answerCode = countryCodes[randomAnswerIndex];
    const answerCountry = countries[answerCode]
      .country as CountryType["country"];

    const randomOptions: string[] = [];
    while (randomOptions.length < 2) {
      const randomIndex = Math.floor(Math.random() * countryCodes.length);
      const optionCountry = countries[countryCodes[randomIndex]]
        .country as CountryType["country"];
      if (
        optionCountry !== answerCountry &&
        !randomOptions.includes(optionCountry)
      ) {
        randomOptions.push(optionCountry);
      }
    }

    const allOptions = shuffleArray([answerCountry, ...randomOptions]);
    setAnswer(answerCountry);
    setFlagUrl(countries[answerCode].flag as CountryType["flag"]);
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
      setGreen(true);

      setCorrect((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      generateOptions();
    } else {
      setRed(true);

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
  if (options.length === 0) generateOptions();

  console.log("Flag URL: ", flagUrl);

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
            appearance={green ? "success" : red ? "destructive" : "secondary"}
            onPress={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </vstack>
    </vstack>
  );
};

export default GameBoard;
