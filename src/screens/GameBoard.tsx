import { Devvit, svg } from "@devvit/public-api";

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
              1
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
              0
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
                5
              </text>
            </hstack>
            <vstack height={100} width={1} border="thin" />
            <hstack gap={"small"} alignment="middle center">
              <icon name="close" height={20} color="red" />
              <text size={"large"} weight="bold" color="orangered">
                2
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
              00:00
            </text>
          </hstack>{" "}
        </>
      )}
    </hstack>
    <spacer size="small" />
    {/* FLAG */}
    <vstack height={36} width={90} alignment="middle center">
      <image
        url={svg`../data/flags/af.svg`}
        imageHeight={100}
        imageWidth={100}
      />
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
      <button width={100} maxHeight={33} appearance="secondary">
        {mode}
      </button>
      <button width={100} maxHeight={33} appearance="secondary">
        Scotland
      </button>
      <button width={100} maxHeight={33} appearance="secondary">
        Ukraine
      </button>
    </vstack>
  </vstack>
);

export default GameBoard;
