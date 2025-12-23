import Image from "next/image";
import { SearchUser } from "../../../app/types/SearchUsers";
import Icon from "../icon";

export default function FindFriend({
  image,
  fullName,
  email,
  add,
  pending = false,
}: SearchUser) {
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
          <p className="text-2xl gray-text">{email}</p>
        </div>
      </div>
      <div
        className="w-6 h-6 rounded-[50%] bg-red-transparent flex items-center justify-center cursor-pointer"
        onClick={add}
      >
        <Icon icon={`${pending ? "hourglass_empty" : "add"}`} iconSize={20} />
      </div>
    </div>
  );
}
