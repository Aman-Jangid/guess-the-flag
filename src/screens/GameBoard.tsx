import { Devvit, IconName, useInterval, useState } from "@devvit/public-api";

import TimerStats from "../components/TimerStats.js";
import StreakStats from "../components/StreakStats.js";

import countriesData from "../data/countries.json" assert { type: "json" };
import { UniqueCombinationGenerator } from "../helpers/genUniqueCombination.js";

const countries = countriesData as unknown as Record<string, CountryType>;

type CountryType = {
  countryName: string;
  countryCode: string;
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

  const arr = Array.from({ length: 254 }, (_, i) => i);
  const combinationGenerator = new UniqueCombinationGenerator(arr);

  // Generate options for the current question
  const generateOptions = () => {
    const combination = combinationGenerator.getUniqueCombination();
    if (!combination) {
      endGame();
      return;
    }

    const [ansIndex, op1Index, op2Index] = combination;

    const answerCountry = countries[ansIndex].countryName;
    const op1Country = countries[op1Index].countryName;
    const op2Country = countries[op2Index].countryName;

    setAnswer(answerCountry);
    setFlagUrl(countries[ansIndex].flag as CountryType["flag"]);
    setOptions(shuffleArray([answerCountry, op1Country, op2Country]));
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
        <image url={flagUrl} imageHeight={250} imageWidth={250} />
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
            appearance={"secondary"}
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
