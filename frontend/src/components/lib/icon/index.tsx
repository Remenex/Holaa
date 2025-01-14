"use client";

type Props = {
  icon: string;
  iconSize?: number;
  text?: string;
  gap?: string;
  // color?: string;
  // margin?: string;
  weight?: string;
  onClick?: () => void;
  variation?: string;
  containerClass?: string;
};

export default function Icon({
  icon,
  iconSize,
  text,
  gap,
  weight,
  onClick,
  variation,
  containerClass,
}: Props) {
  // default values
  gap ??= text ? "12px" : "0px";
  iconSize ??= 24;

  const cursorPointer = onClick ? "cursorPointer" : undefined;

  return (
    <div
      className={`flex items-center ${cursorPointer} ${containerClass}`}
      style={{ gap }}
      onClick={onClick}
    >
      <span
        className={`material-symbols-rounded select-none ${variation}`}
        style={{ fontSize: `${iconSize}px` }}
      >
        {icon}
      </span>
      <label className={`${weight}`}>{text}</label>
    </div>
  );
}
