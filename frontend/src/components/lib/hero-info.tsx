import Icon from "./icon";

type Props = {
  icon: string;
  text: string;
};

export default function HeroInfo({ icon, text }: Props) {
  return (
    <div className="light-gradient rounded-[30px] p-[1px]">
      <div className="px-4 py-1 hero-info-gradient rounded-[30px]">
        <div className="flex items-center justify-center">
          <Icon icon={icon} iconSize={30} variation="text-white" />
          <p className="font-bold ml-2">{text}</p>
        </div>
      </div>
    </div>
  );
}
