import Image from "next/image";

type Props = {
  image: string;
  name: string;
};

export default function MovieItem({ image, name }: Props) {
  return (
    <div className="relative cursor-pointer rounded-5xl group w-[500px] h-[600px] mb-12">
      <Image
        src={image}
        alt="movie-image"
        className="rounded-5xl"
        fill={true}
      />
      <div className="absolute inset-0 flex items-end p-10 justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
        <h3 className="text-white text-lg font-bold">{name}</h3>
      </div>
    </div>
  );
}
