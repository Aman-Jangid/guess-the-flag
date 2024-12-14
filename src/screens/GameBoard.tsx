import { Devvit } from "@devvit/public-api";

type PageProps = {
  setPage: (page: string) => void;
};

const GameBoard = ({ setPage }: PageProps) => (
  <vstack
    width="100%"
    height="100%"
    alignment="center"
    backgroundColor="#0B1315"
    lightBackgroundColor="#FEFFFE"
  >
    <spacer size="small" />
    <hstack
      alignment={"center middle"}
      cornerRadius={"small"}
      width={90}
      height={12}
      gap={"small"}
    >
      <vstack
        height={100}
        width={30}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"white"}
      />
      <vstack
        height={100}
        width={20}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"transparent"}
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

    <vstack
      height={40}
      width={90}
      backgroundColor=""
      border={"thick"}
      cornerRadius={"small"}
      borderColor={"white"}
    />
    <spacer size="small" />

    <vstack
      height={38}
      width={90}
      backgroundColor=""
      border={"thick"}
      cornerRadius={"small"}
      gap={"small"}
    >
      <vstack
        height={60}
        width={100}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"red"}
        grow
      />
      <vstack
        height={60}
        width={100}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"red"}
        grow
      />
      <vstack
        height={60}
        width={100}
        backgroundColor=""
        border={"thick"}
        cornerRadius={"small"}
        borderColor={"red"}
        grow
      />
    </vstack>
  </vstack>
);

export default GameBoard;
