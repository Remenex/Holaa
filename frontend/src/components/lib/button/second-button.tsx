

export type Props = {
  text: string;
  iconImage?: string;
  iconSize?: number;
  className?: string;
  backgroundColor?:string;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function SecondButton({
  text,
  iconImage,
  iconSize,
  className,
  backgroundColor,
  ...props
}:Props) {

  return (
    <div className="light-gradient rounded-[30px] p-[1px]">
      <button
        className={`py-4 px-8 rounded-[30px] ${backgroundColor ?? `bg-dark-gray`} text-white font-bold text-[18px] flex items-center transparent ${className}`}
        {...props}
      >
        {iconImage && (
          <span
            className={`material-symbols-rounded select-none quoteIconSettings`}
            style={{ fontSize: `${iconSize}px` }}
          >
            {iconImage}
          </span>
        )}
        {text}
      </button>
    </div>
  );
}
