import { Devvit } from "@devvit/public-api";
import { GameModeSelector } from "../components/GameModeSelector.js";
import { NavigationButtons } from "../components/NavigationButtons.js";
export type optionType = "timer" | "streak";

export interface PageProps {
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
      <GameModeSelector mode={mode} setMode={setMode} />
      <spacer height={2} />
      <NavigationButtons setPage={setPage} />
    </vstack>
  );
};

export default GameOptions;

