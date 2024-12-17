import { Devvit } from "@devvit/public-api";

interface NavigationButtonsProps {
  startGame: () => void;
  setPage: (page: string) => void;
}

export const NavigationButtons = ({
  startGame,
  setPage,
}: NavigationButtonsProps) => {
  return (
    <>
      <button
        width={70}
        appearance={"primary"}
        icon={"star"}
        onPress={startGame}
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
    </>
  );
};
