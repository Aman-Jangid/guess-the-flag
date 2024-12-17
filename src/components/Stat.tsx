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
    <icon name={icon as IconName} height={12} color={color} />
    <text size="medium" weight="bold" color={color}>
      {value}
    </text>
  </hstack>
);

export default Stat;
