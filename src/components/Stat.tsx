import { IconName, Devvit } from "@devvit/public-api";

const Stat = ({
  icon,
  value,
  color,
}: {
  icon: string;
  value: number;
  color: string;
}) => (
  <hstack gap="small" alignment="middle center">
    <icon name={icon as IconName} height={14} color={color} />
    <text size="large" weight="bold" color={color}>
      {value}
    </text>
  </hstack>
);

export default Stat;
