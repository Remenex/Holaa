import type { CurrentlyWatching } from "@/app/types/CurrentlyWatching";
import { CreateInvite, InviteStatus } from "@/app/types/invite.type";
import { Room } from "@/app/types/room.type";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Icon from "../lib/icon";
import WatchingUser from "../lib/player/currently-watching";
import FindFriend from "../lib/player/find-friend";
import { Search } from "../ui/search";

type Props = {
  isFriendsOpen: boolean;
  currentlyWatchUsersData: CurrentlyWatching[];
  removeCurrentlyWatchFriend?: (id: number) => void;
};

const placeholders = [
  "Unesite email adresu vaseg prijatelja",
  "Unesite ime i prezime vaseg korisnika",
];

export function CurrentlyWatchingComponent({
  isFriendsOpen,
  currentlyWatchUsersData,
}: Props) {
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
  const [findFriends, setFindFriends] = useState<SearchUser[]>([]);
  const [room, setRoom] = useState<Room>();
  const [currentlyWatchUsers, setCurrentlyWatchUsers] = useState(
    currentlyWatchUsersData
  );

  const handleAddFriendsOpen = () => {
    setIsAddFriendsOpen(!isAddFriendsOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          credentials: "include",
        });

        if (!res.ok) {
          toast.error("Greska pri dobijanju prijatelja");
        }

        const data: User[] = await res.json();
        setFindFriends(data);
      } catch (error) {
        toast.error("Greska pri dobijanju prijatelja", {
          description: error as string,
        });
      } finally {
      }
    };

    fetchUsers();
  }, []);

  const sendInvite = async (id: string) => {
    setFindFriends((prevFindFriend) =>
      prevFindFriend.map((element) =>
        element._id === id ? { ...element, pending: true } : element
      )
    );

    // if(!room)

    const inviteData: CreateInvite = {
      toUserId: id,
      status: InviteStatus.PENDING,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/invites",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inviteData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send invite");
      }

      const data = await response.json();
    } catch (error) {
      console.error(error);

      setFindFriends((prevFindFriend) =>
        prevFindFriend.map((element) =>
          element._id === id ? { ...element, pending: false } : element
        )
      );
    }
  };

  const removeCurrentlyWatchFriend = (id: number) => {
    setCurrentlyWatchUsers(
      currentlyWatchUsers.filter((element) => element.id !== id)
    );
  };

  return (
    <motion.div
      className="absolute top-14 right-0 bg-dark-gray p-10 rounded-[30px] w-[400px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isFriendsOpen ? 1 : 0,
        y: isFriendsOpen ? 0 : -20,
      }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isFriendsOpen ? "auto" : "none" }}
    >
      <div className="w-full relative">
        <div className="w-full flex items-center justify-between">
          <h3>TRENUTNO GLEDAJU</h3>
          <div className="cursor-pointer">
            <Icon
              icon="person_add"
              iconSize={30}
              onClick={handleAddFriendsOpen}
            />
          </div>
        </div>
        <div className="w-full mt-6 flex flex-col gap-3">
          {currentlyWatchUsers.map((element) => (
            <WatchingUser
              id={element.id}
              key={element.fullName}
              image={element.image}
              fullName={element.fullName}
              designation=""
              isAdmin={element.isAdmin}
              remove={() => {
                removeCurrentlyWatchFriend(element.id);
              }}
            />
          ))}
        </div>
      </div>
      <motion.div
        className="absolute top-0 right-[410px] bg-dark-gray p-10 rounded-[30px] w-[400px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isAddFriendsOpen ? 1 : 0,
          x: isAddFriendsOpen ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isAddFriendsOpen ? "auto" : "none" }}
      >
        <div className=" flex flex-col justify-center  items-center">
          <Search
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <div className="w-full mt-6 flex flex-col gap-3">
            {findFriends &&
              findFriends.length > 0 &&
              findFriends.map((element, index) => {
                return (
                  <FindFriend
                    key={element._id}
                    user={element}
                    add={() => sendInvite(element._id)}
                  />
                );
              })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
