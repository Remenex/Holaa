import { getColorForLetter } from "@/lib/helpers/letter-color";

type Props = {
  firstname: string;
  lastname: string;
  sizeRem: number;
};

export default function UserAvatar({ firstname, lastname, sizeRem }: Props) {
  const bgColor = getColorForLetter(firstname.charAt(0));

  const sizeStyle = {
    width: `${sizeRem}rem`,
    height: `${sizeRem}rem`,
    minWidth: `${sizeRem}rem`,
    minHeight: `${sizeRem}rem`,
  };

  return (
    <div
      style={{ ...sizeStyle, backgroundColor: bgColor }}
      className="rounded-full text-white/60 flex items-center justify-center text-2xl gap-1"
    >
      <span>{firstname.charAt(0)}</span>
      <span>{lastname.charAt(0)}</span>
    </div>
  );
}
