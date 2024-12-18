// a component with a list of attributions
import { Devvit } from "@devvit/public-api";

interface PageProps {
  setPage: (page: string) => void;
}

export default function Credits({ setPage }: PageProps) {
  return (
    <vstack>
      <button
        appearance="bordered"
        onPress={() => {
          setPage("a");
        }}
      >
        Go back
      </button>
      <text>credits , attributions</text>
      <text>
        Alarm icons created by Freepik :
        https://www.flaticon.com/free-icons/alarm
      </text>
      <text>
        Fire icons created by Bahu Icons :
        https://www.flaticon.com/free-icons/fire
      </text>
    </vstack>
  );
}
