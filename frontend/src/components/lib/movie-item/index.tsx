import Image from "next/image";

type Props = {
  image: string;
  name: string;
};

export default function MovieItem({ image, name }: Props) {
  return (
    <div className="relative cursor-pointer group w-[500px] h-[600px] mb-12 rounded-[20px] overflow-hidden">
      <Image
        src={image}
        alt="movie-image"
        width={500}
        height={600}
        className="object-cover"
      />

      <div className="absolute inset-0 flex items-end p-10 justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-lg font-bold">{name}</h3>
      </div>
    </div>
  );
}
