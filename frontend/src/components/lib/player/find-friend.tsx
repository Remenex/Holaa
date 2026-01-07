import Icon from "../icon";
import UserAvatar from "../user-avatar";

type Props = {
  user: SearchUser;
  add?: () => void;
};

export default function FindFriend({ user, add }: Props) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar
          firstname={user.firstName}
          lastname={user.lastName}
          sizeRem={3.5}
        />
        <div>
          <p className="text-2xl">{user.firstName + " " + user.lastName}</p>
          <p className="text-2xl gray-text">{user.email}</p>
        </div>
      </div>
      <div
        className="w-6 h-6 rounded-[50%] bg-red-transparent flex items-center justify-center cursor-pointer"
        onClick={add}
      >
        <Icon
          icon={`${user.pending ? "hourglass_empty" : "add"}`}
          iconSize={20}
        />
      </div>
    </div>
  );
}
