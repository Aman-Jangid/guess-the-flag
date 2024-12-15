import { Devvit, svg, useInterval, useState } from "@devvit/public-api";

import countries from "../data/data.json" assert { type: "json" };

type PageProps = {
  setPage: (page: string) => void;
  mode: "timer" | "streak";
};

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// timer
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

const GameBoard = ({ setPage, mode }: PageProps) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer (60 seconds)
  const [options, setOptions] = useState<string[]>([]); // Shuffled options
  const [answer, setAnswer] = useState<string>(""); // Correct answer
  const [flagUrl, setFlagUrl] = useState<string>(""); // Flag image URL
  const [streak, setStreak] = useState<number>(0); // Streak counter
  const [firstRender, setFirstRender] = useState<boolean>(true); // First render flag
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const generateOptions = () => {
    const countryCodes = Object.keys(countries); // All country codes
    const randomAnswerIndex = Math.floor(Math.random() * countryCodes.length); // Random index for the answer
    const answerCode = countryCodes[randomAnswerIndex]; // Unique answer code
    const answerCountry = countries[answerCode].country; // Answer country name

    // Pick two random options (can repeat initially but must be unique finally)
    let randomOptions: string[] = [];
    while (randomOptions.length < 2) {
      const randomIndex = Math.floor(Math.random() * countryCodes.length);
      const optionCode = countryCodes[randomIndex];
      const optionCountry = countries[optionCode].country;
      if (
        optionCountry !== answerCountry &&
        !randomOptions.includes(optionCountry)
      ) {
        randomOptions.push(optionCountry);
      }
    }

    // Combine and shuffle options
    const allOptions = shuffleArray([answerCountry, ...randomOptions]);

    // Set state
    setAnswer(answerCountry); // Save the answer
    setFlagUrl(countries[answerCode].flag); // Save the flag URL
    setOptions(allOptions); // Save the shuffled options
  };

  // Generate options on first render
  if (firstRender) {
    generateOptions();
    setFirstRender(false);  console.log("Answer:", answer);
    console.log("flag", flagUrl);
  }

  // start the timer only if the mode is timer
  if (mode === "timer") {
    const tick = () => {
      if (timeLeft === 0) {
        setGameOver(true);
        setFirstRender(true);
        setPage("d");
        return;
      }
      setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
    };
    useInterval(tick, 1000).start();
  }

  const handleOptionClick = (option: string) => {
    if (option === answer) {
      setCorrect((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      generateOptions();
    } else {
      if (mode === "streak") {
        setGameOver(true);
        setFirstRender(true);
        setPage("d");
        return;
      }
      if (mode === "timer") {
        setIncorrect((prev) => prev + 1);
        generateOptions();
      }
    }
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
      {/* STATS */}
      <hstack
        alignment={"center middle"}
        cornerRadius={"small"}
        width={90}
        height={10}
        gap={"small"}
      >
        {mode === "streak" && (
          <>
            <hstack
              height={100}
              width={40}
              backgroundColor=""
              border={"thick"}
              cornerRadius={"small"}
              alignment="middle center"
            >
              <text size={"large"} weight="bold" color="orange">
                {streak}
              </text>
              <text size={"large"}>/256</text>
            </hstack>
            <vstack
              height={100}
              backgroundColor="transparent"
              borderColor="transparent"
              border={"thick"}
              cornerRadius={"small"}
              grow
            />
            <hstack
              height={100}
              width={40}
              backgroundColor=""
              border={"thick"}
              cornerRadius={"small"}
              alignment="middle center"
              gap="small"
            >
              <image url="streak.png" imageHeight={20} imageWidth={20} />
              <text size={"large"} color="white">
                {streak}
              </text>
            </hstack>{" "}
          </>
        )}
        {mode === "timer" && (
          <>
            <hstack
              height={100}
              width={50}
              backgroundColor=""
              border={"thick"}
              cornerRadius={"small"}
              alignment="middle center"
              gap="small"
            >
              <hstack gap={"small"} alignment="middle center">
                <icon name="checkmark" height={20} color="green" />
                <text size={"large"} weight="bold" color="yellowgreen">
                  {correct}
                </text>
              </hstack>
              <vstack height={100} width={1} border="thin" />
              <hstack gap={"small"} alignment="middle center">
                <icon name="close" height={20} color="red" />
                <text size={"large"} weight="bold" color="orangered">
                  {incorrect}
                </text>
              </hstack>
            </hstack>
            <vstack
              height={100}
              backgroundColor="transparent"
              borderColor="transparent"
              border={"thick"}
              cornerRadius={"small"}
              grow
            />
            <hstack
              height={100}
              width={40}
              backgroundColor=""
              border={"thick"}
              cornerRadius={"small"}
              alignment="middle center"
              gap="small"
            >
              <image url="timer.png" imageHeight={20} imageWidth={20} />
              <text size={"large"} color="white" weight="bold">
                {formatTime(timeLeft)}
              </text>
            </hstack>{" "}
          </>
        )}
      </hstack>
      <spacer size="small" />
      {/* FLAG */}
      <vstack height={36} width={90} alignment="middle center">
        <image url={flagUrl} imageHeight={150} imageWidth={150} />
      </vstack>
      <spacer size="small" />
      {/* OPTIONS */}
      <vstack
        height={38}
        width={90}
        alignment="middle center"
        cornerRadius={"small"}
        gap={"small"}
      >
        {options.map((option, index) => (
          <button
            width={100}
            key={index.toString()}
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

export default GameBoard;
