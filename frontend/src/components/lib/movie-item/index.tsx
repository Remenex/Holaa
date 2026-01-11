import Image from "next/image";

type Props = {
  _id: string;
  image: string;
  name: string;
};

// localhost:3000/player/id

export default function MovieItem({ _id, image, name }: Props) {
  return (
    <a
      className="relative cursor-pointer group  h-[600px] mb-12 rounded-[20px] overflow-hidden"
      href={`http://localhost:3000/player/${_id}`}
    >
      <Image src={image} alt="movie-image" fill className="object-cover" />

      <div className="absolute inset-0 flex items-end p-10 justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-lg font-bold">{name}</h3>
      </div>
    </a>
  );
}
