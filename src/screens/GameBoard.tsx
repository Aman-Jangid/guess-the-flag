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
  setScore: (score: number | ((prev: number) => number)) => void;
  score: number;
  streak: number;
  correct: number;
  incorrect: number;
  lives: number;
  setCorrect: (correct: number | ((prev: number) => number)) => void;
  setIncorrect: (incorrect: number | ((prev: number) => number)) => void;
  setStreak: (streak: number | ((prev: number) => number)) => void;
  setLives: (lives: number | ((prev: number) => number)) => void;
};

const maxStreak = 254;

const GameBoard = ({
  setPage,
  mode,
  setScore,
  score,
  correct,
  incorrect,
  lives,
  setCorrect,
  setIncorrect,
  setLives,
  setStreak,
  streak,
}: PageProps) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer
  const [timer, setTimer] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]); // Shuffled options
  const [answer, setAnswer] = useState<string>(""); // Correct answer
  const [flagUrl, setFlagUrl] = useState<string>(""); // Flag image URL

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [multiplier, setMultiplier] = useState<number>(1);

  const arr = Array.from({ length: 254 }, (_, i) => i);
  const combinationGenerator = new UniqueCombinationGenerator(arr);

  const endGame = () => {
    setGameOver(true);
    setOptions([]);
    setAnswer("");
    setFlagUrl("");
    setTimer(0);
    setPage("d");
  };

  const initializeOptions = () => {
    console.log("Initializing options");
    const result = generateOptions(countries, combinationGenerator, endGame);
    if (result) {
      console.log("Options generated", {
        answerCountry: result.answerCountry,
        flagUrl: result.flagUrl,
        options: result.options,
      });
      setAnswer(result.answerCountry);
      setFlagUrl(result.flagUrl);
      setOptions(result.options);
    } else {
      console.error("Failed to generate options");
      endGame(); // Graceful fallback if option generation fails
    }
  };

  // Add an interval for streak mode to periodically ensure options are generated
  useInterval(() => {
    if (options.length === 0) {
      initializeOptions();
    }
  }, 500).start();

  // Handle timer logic for Timer Mode
  if (mode === "timer") {
    useInterval(() => {
      if (timeLeft > 0) {
        setTimer((prev) => prev + 1);
        setTimeLeft((prev) => prev - 1);
      } else {
        endGame();
      }
    }, 1000).start();
  }

  // Handle option click
  const handleOptionClick = (option: string) => {
    if (option === answer) {
      // score counting in timer mode
      if (mode === "timer") {
        if (streak === maxStreak) {
          setScore((prev: number) => prev + timeLeft * 2);
        }
        setScore((prev: number) => prev + 10);
        setTimeLeft((prev) => prev + 3);
      }
      // score counting in streak mode
      else {
        if (streak >= 2) {
          if (timer < 2) {
            setScore((prev: number) => prev + 10 * 2);
          }
          if (timer >= 2) {
            setScore((prev: number) => prev + 10 * 1.5);
          }
          if (timer >= 5) {
            setScore((prev: number) => prev + 10 * 1.25);
          } else {
            setMultiplier((prev) => prev + 1);
            setScore((prev: number) => prev + 10 * multiplier);
          }
        }
        setScore((prev: number) => prev + 10);
      }

      setCorrect((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      initializeOptions();
    } else {
      if (mode === "streak") {
        if (lives <= 0) {
          endGame();
        }
        setStreak(0);
        setLives((prev) => prev - 1);
      } else if (mode === "timer") {
        setScore((prev: number) => prev - 5);
        setTimeLeft((prev) => prev - 3);
        setIncorrect((prev) => prev + 1);
        initializeOptions();
      }
    }
    setTimer(0);
  };

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
          <StreakStats streak={streak} lives={lives} />
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
      <vstack
        height={36}
        width={90}
        alignment="middle center"
        border="thin"
        darkBorderColor="white"
        lightBorderColor="#0A1315"
        cornerRadius="small"
      >
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
