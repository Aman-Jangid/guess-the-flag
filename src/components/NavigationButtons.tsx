import { Devvit } from "@devvit/public-api";

interface NavigationButtonsProps {
    setPage: (page: string) => void;
  }
  
  export const NavigationButtons = ({ setPage }: NavigationButtonsProps) => {
    return (
      <>
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
      </>
    );
  };
  