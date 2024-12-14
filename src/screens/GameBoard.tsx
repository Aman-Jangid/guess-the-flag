import { Devvit } from "@devvit/public-api";

type PageProps = {
  setPage: (page: string) => void;
  mode: "timer" | "streak";
};

const GameBoard = ({ setPage, mode }: PageProps) => (
  <vstack
    width="100%"
    height="100%"
    alignment="center"
    backgroundColor="#0B1315"
    lightBackgroundColor="#FEFFFE"
    onPress={() => setPage("a")}
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
      {/* question no. */}
      <vstack
        height={100}
        width={30}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"white"}
      >
        <text size={"medium"} color="orange">
          1
        </text>
        <text size={"medium"}>/256</text>
      </vstack>
      {/* mode.?timer */}
      <vstack
        height={100}
        width={20}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={mode === "streak" ? "transparent" : "white"}
        grow
      />
      <vstack
        height={100}
        width={30}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"white"}
      />
    </hstack>
    <spacer size="small" />
    {/* FLAG */}
    <vstack height={36} width={90} alignment="middle center">
      <image url={"../data/flags/ad.svg"} imageHeight={100} imageWidth={100} />
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
      <button width={100} appearance="secondary">
        {mode}
      </button>
      <button width={100} appearance="secondary">
        Scotland
      </button>
      <button width={100} appearance="secondary">
        Ukraine
      </button>
    </vstack>
  </vstack>
);

export default GameBoard;
