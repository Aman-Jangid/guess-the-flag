import { Devvit, useState } from "@devvit/public-api";

type optionType = "timer" | "streak";

interface PageProps {
  setPage: (page: string) => void;
  mode: optionType;
  setMode: (option: optionType) => void;
}

const GameOptions = ({ setPage, setMode, mode }: PageProps) => {
  return (
    <vstack width="100%" height="100%" alignment="middle center" gap="medium">
      <text size="large" weight="bold">
        Choose game mode
      </text>
      <hstack gap="large" alignment="center middle">
        <vstack
          width={"80px"}
          height={"100px"}
          alignment="middle center"
          gap="small"
          cornerRadius={"medium"}
          border="thick"
          borderColor={mode === "timer" ? "#176FF4" : "transparent"}
          backgroundColor={mode === "timer" ? "#19272C" : "transparent"}
          onPress={() => setMode("timer")}
        >
          <image imageHeight={"55px"} imageWidth={"55px"} url={"timer.png"} />
          <text
            size="large"
            weight="bold"
            color={mode == "timer" ? "#176FF4" : "white"}
          >
            Timer
          </text>
        </vstack>
        <vstack
          width={"80px"}
          height={"100px"}
          alignment="middle center"
          gap="small"
          cornerRadius={"medium"}
          border="thick"
          borderColor={mode === "streak" ? "#D93804" : "transparent"}
          backgroundColor={mode === "streak" ? "#19272C" : "transparent"}
          onPress={() => setMode("streak")}
        >
          <image imageHeight={"55px"} imageWidth={"55px"} url={"streak.png"} />
          <text
            size="large"
            weight="bold"
            color={mode == "streak" ? "#D93804" : "white"}
          >
            Streak
          </text>
        </vstack>
      </hstack>
      <spacer height={2} />
      <button
        width={70}
        appearance={"primary"}
        icon={"star"}
        onPress={() => setPage("c")}
      >
        Start
      </button>
      <button
        width={70}
        appearance={"bordered"}
        icon={"back"}
        onPress={() => setPage("a")}
      >
        Go back
      </button>
    </vstack>
  );
};

export default GameOptions;
