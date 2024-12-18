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

// Scoring Constants
const BASE_POINTS = 10;
const MAX_SPEED_BONUS = 5;
const MAX_STREAK_BONUS = 10;
const INITIAL_LIVES = 3;
const INITIAL_TIME = 60;

const calculateScoreMultiplier = (streak: number, timer: number): number => {
  // Streak multiplier (increases with consecutive correct answers)
  const streakMultiplier = Math.min(1 + Math.floor(streak / 5), 3);

  // Speed multiplier (rewards quick answers)
  const speedMultiplier =
    timer < 2 ? 2 : timer < 5 ? 1.5 : timer < 10 ? 1.25 : 1;

  return streakMultiplier * speedMultiplier;
};

const handleScoring = (
  mode: "timer" | "streak",
  setScore: (update: (prev: number) => number) => void,
  streak: number,
  timer: number,
  timeLeft?: number
): void => {
  if (mode === "timer") {
    // Timer Mode Scoring
    let points = BASE_POINTS;

    // Speed bonus (max 5 additional points)
    const speedBonus = Math.max(0, MAX_SPEED_BONUS - timer);
    points += speedBonus;

    // Streak bonus (if near max streak)
    if (streak > 200) {
      points += Math.min(streak - 200, MAX_STREAK_BONUS);
    }

    // Time bonus: extra points based on remaining time
    if (timeLeft && timeLeft > 30) {
      points += Math.floor(timeLeft / 10);
    }

    setScore((prev) => prev + points);
  } else {
    // Streak Mode Scoring
    const multiplier = calculateScoreMultiplier(streak, timer);
    const points = Math.round(BASE_POINTS * multiplier);

    setScore((prev) => prev + points);
  }
};

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
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME); // 1-minute timer
  const [timer, setTimer] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]); // Shuffled options
  const [answer, setAnswer] = useState<string>(""); // Correct answer
  const [flagUrl, setFlagUrl] = useState<string>(""); // Flag image URL

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [longestStreak, setLongestStreak] = useState<number>(0);

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
      // New scoring system
      handleScoring(
        mode,
        setScore,
        streak,
        timer,
        mode === "timer" ? timeLeft : undefined
      );

      // Update streak and correct answers
      const newCorrect = correct + 1;
      setCorrect(() => newCorrect);

      // Update longest streak
      const newStreak = streak + 1;
      setStreak(() => newStreak);

      // Track longest streak
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }

      if (mode === "timer") {
        setTimeLeft((prev) => Math.min(prev + 3, INITIAL_TIME));
      }

      initializeOptions();
    } else {
      // Error handling logic
      if (mode === "streak") {
        // Ensure lives never go below 0
        const newLives = Math.max(0, lives - 1);

        if (newLives === 0) {
          endGame();
        }

        setLives(() => newLives);
        setStreak(0);
      } else if (mode === "timer") {
        setScore((prev) => prev - 5);
        // Prevent time from going negative
        setTimeLeft((prev) => Math.max(0, prev - 3));
        setIncorrect((prev) => prev + 1);
      }

      initializeOptions();
    }

    // Reset timer after each answer
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
          <StreakStats streak={streak} lives={Math.max(0, lives)} />
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
