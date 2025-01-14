import Image from "next/image";

type Props = {
  image: string;
  name: string;
};

export default function CategoryItem({ image, name }: Props) {
  return (
    <div className="bg-dark-gray w-1/5 min-w-[252px] flex flex-col items-center p-10 gap-5 rounded-xl">
      <div>
        <Image src={image} alt="category-image" width={262} height={218} />
      </div>
      <div className="flex w-full justify-between">
        <h2 className="text-3xl">{name}</h2>
        <div className=" flex p-1 items-center justify-center border-s-white rounded-[50%] border-2 cursor-pointer">
          <Image
            src="/icons/arrow.svg"
            alt="arrow-icon"
            width={29}
            height={29}
          />
        </div>
      </div>
    </div>
  );
}
