
export type Props = {
  text: string;
  iconImage?: string;
  iconSize?: number;
  className?: string;
  iconMargin?: number;
  small?:boolean
} & React.HTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  iconImage,
  iconSize,
  className,
  iconMargin,
  small,
  ...props
}:Props) {


  return (
    <button
      className={`${
        small ? `px-4 py-2 rounded-lg` : `py-4 px-8 rounded-[30px]`
      } main-gradient text-white font-bold text-[18px] flex items-center duration-300 hover:hover-gradient ${className}`}
      {...props}
    >
      {iconImage && (
        <span
          className={`material-symbols-rounded select-none quoteIconSettings`}
          style={{ fontSize: `${iconSize}px`, marginRight: `${iconMargin}px` }}
        >
          {iconImage}
        </span>
      )}
      {text}
    </button>
  );
}
