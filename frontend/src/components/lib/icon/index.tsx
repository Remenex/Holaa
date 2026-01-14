type Props = {
  icon: string;
  iconSize?: number;
  text?: string;
  gap?: string;
  weight?: string;
  onClick?: () => void;
  variation?: string;
  filled?: boolean;
  color?: string;
  containerClass?: string;
};

export default function Icon({
  icon,
  iconSize = 24,
  text,
  gap,
  weight,
  onClick,
  variation,
  filled = false,
  color,
  containerClass,
}: Props) {
  gap ??= text ? "12px" : "0px";

  return (
    <div
      className={`flex items-center ${
        onClick ? "cursor-pointer" : ""
      } ${containerClass}`}
      style={{ gap }}
      onClick={onClick}
    >
      <span
        className={`material-symbols-rounded select-none ${variation}`}
        style={{
          fontSize: iconSize,
          color,
          fontVariationSettings: `
            'FILL' ${filled ? 1 : 0},
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
          `,
        }}
      >
        {icon}
      </span>

      {text && <label className={weight}>{text}</label>}
    </div>
  );
}
