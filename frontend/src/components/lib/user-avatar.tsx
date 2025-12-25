import { getColorForLetter } from "@/lib/utils/letter-color";

type Props = {
  firstname: string;
  lastname: string;
};

export default function UserAvatar({ firstname, lastname }: Props) {
  const bgColor = getColorForLetter(firstname.charAt(0));
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="rounded-full w-16 h-16 text-white/60 flex items-center justify-center text-2xl gap-1"
    >
      <span>{firstname.charAt(0)}</span>
      <span> {lastname.charAt(0)}</span>
    </div>
  );
}
