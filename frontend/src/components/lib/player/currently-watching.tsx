import Icon from "../icon";
import UserAvatar from "../user-avatar";

type Props = {
  user: User;
  remove?: () => void;
};

export default function WatchingUser({ user, remove }: Props) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar
          firstname={user.firstName}
          lastname={user.lastName}
          sizeRem={4}
        />
        <div>
          <p className="text-2xl">{user.firstName + " " + user.lastName}</p>
          {user.role && <p className="text-2xl gray-text">Admin</p>}
        </div>
      </div>
      {!user.role && (
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
