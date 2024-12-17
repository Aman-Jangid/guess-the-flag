import { Devvit, useInterval, useState } from "@devvit/public-api";
import TimerStats from "../components/TimerStats.js";
import StreakStats from "../components/StreakStats.js";
import countriesData from "../data/countries.json" assert { type: "json" };
import { UniqueCombinationGenerator } from "../helpers/genUniqueCombination.js";
import { generateOptions } from "../helpers/generateOptions.js";
import { CountryType } from "../types/CountryType.js";

const countries = countriesData as unknown as Record<string, CountryType>;

type PageProps = {
  setPage: (page: string) => void;
  mode: "timer" | "streak";
  setScore?: (score: number) => void;
};

const GameBoard = ({ setPage, mode }: PageProps) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer
  const [options, setOptions] = useState<string[]>([]); // Shuffled options
  const [answer, setAnswer] = useState<string>(""); // Correct answer
  const [flagUrl, setFlagUrl] = useState<string>(""); // Flag image URL
  const [streak, setStreak] = useState<number>(0); // Streak counter
  const [correct, setCorrect] = useState<number>(0); // Correct counter
  const [incorrect, setIncorrect] = useState<number>(0); // Incorrect counter
  const [gameOver, setGameOver] = useState<boolean>(false);

  const arr = Array.from({ length: 254 }, (_, i) => i);
  const combinationGenerator = new UniqueCombinationGenerator(arr);

  const endGame = () => {
    setGameOver(true);
    setPage("d");
  };

  const initializeOptions = () => {
    const result = generateOptions(countries, combinationGenerator, endGame);
    if (result) {
      setAnswer(result.answerCountry);
      setFlagUrl(result.flagUrl);
      setOptions(result.options);
    }
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
      initializeOptions();
    } else {
      if (mode === "streak") {
        endGame();
      } else if (mode === "timer") {
        setIncorrect((prev) => prev + 1);
        initializeOptions();
      }
    }
  };

  // Initialize options on first render
  if (options.length === 0) initializeOptions();

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
