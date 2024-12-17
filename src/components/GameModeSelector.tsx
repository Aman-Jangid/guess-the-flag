import { Devvit } from "@devvit/public-api";
import { optionType } from "../screens/GameOptions.js";

interface GameModeSelectorProps {
  mode: optionType;
  setMode: (option: optionType) => void;
}

export const GameModeSelector = ({ mode, setMode }: GameModeSelectorProps) => {
  return (
    <hstack gap="large" alignment="center middle">
      <ModeCard
        title="Timer"
        imageUrl="timer.png"
        isSelected={mode === "timer"}
        onClick={() => setMode("timer")}
        selectedColor="#176FF4"
      />
      <ModeCard
        title="Streak"
        imageUrl="streak.png"
        isSelected={mode === "streak"}
        onClick={() => setMode("streak")}
        selectedColor="#D93804"
      />
    </hstack>
  );
};

interface ModeCardProps {
  title: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
  selectedColor: string;
}

const ModeCard = ({
  title,
  imageUrl,
  isSelected,
  onClick,
  selectedColor,
}: ModeCardProps) => {
  return (
    <vstack
      width={"80px"}
      height={"100px"}
      alignment="middle center"
      gap="small"
      cornerRadius={"medium"}
      border="thick"
      borderColor={isSelected ? selectedColor : "transparent"}
      darkBackgroundColor={isSelected ? "#19272C" : "transparent"}
      lightBackgroundColor={isSelected ? "#E5EBEE" : "transparent"}
      onPress={onClick}
    >
      <image imageHeight={"55px"} imageWidth={"55px"} url={imageUrl} />
      <text
        size="large"
        weight="bold"
        lightColor={isSelected ? selectedColor : "#19272C"}
        darkColor={isSelected ? selectedColor : "white"}
      >
        {title}
      </text>
    </vstack>
  );
};
