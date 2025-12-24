import Image from "next/image";
import { CurrentlyWatching } from "../../../app/types/CurrentlyWatching";
import Icon from "../icon";

export default function WatchingUser({
  image,
  fullName,
  isAdmin = false,
  remove,
}: CurrentlyWatching) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          width={60}
          height={60}
          alt={fullName}
          className="rounded-[50%]"
        />
        <div>
          <p className="text-2xl">{fullName}</p>
          {isAdmin && <p className="text-2xl gray-text">Admin</p>}
        </div>
      </div>
      {!isAdmin && (
        <div
          className="w-6 h-6 rounded-[50%] bg-red-700 flex items-center justify-center cursor-pointer"
          onClick={remove}
        >
          <Icon icon="close" iconSize={20} />
        </div>
      )}
    </div>
  );
}
