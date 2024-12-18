import { Devvit } from "@devvit/public-api";
import { GameModeSelector } from "../components/GameModeSelector.js";
import { NavigationButtons } from "../components/NavigationButtons.js";
export type optionType = "timer" | "streak";

export interface PageProps {
  mode: optionType;
  startGame: () => void;
  setMode: (mode: optionType) => void;
  setPage: (page: string) => void;
}

const GameOptions = ({ startGame, mode, setMode, setPage }: PageProps) => {
  return (
    <vstack width="100%" height="100%" alignment="middle center" gap="medium">
      <text size="large" weight="bold">
        Select game mode
      </text>
      <spacer height={2} />
      <GameModeSelector mode={mode} setMode={setMode} />
      <spacer height={2} />
      <NavigationButtons startGame={startGame} setPage={setPage} />
    </vstack>
  );
};

export default GameOptions;
