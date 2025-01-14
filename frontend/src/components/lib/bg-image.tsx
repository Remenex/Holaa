import Link from "next/link";

type Props = {
  bigTitle: string;
  linkTitle: string;
};

export default function BgImageOverlay({ bigTitle, linkTitle }: Props) {
  return (
    <div className="relative z-1 top-0 left-0 w-full h-[450px] bg-[url('/images/bg-image-overlay.png')] flex justify-center items-center">
      <div className=" flex flex-col items-center z-[2]">
        <h1 className="text-5xl">{bigTitle}</h1>
        <div>
          <Link className="gray-text font-display font-bold" href="/">
            POCETNA /
          </Link>{" "}
          <p className="inline gray-text font-display font-bold">{linkTitle}</p>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 left-0 overlay-gradient z-1"></div>
    </div>
  );
}
