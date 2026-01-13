import Icon from "@/components/lib/icon";
import {
  deleteFriendship,
  getUserFriends,
} from "@/services/friendships.service";
import { getWatchedMovies } from "@/services/movies.service";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  reactions?: Reaction[];
};

export default function Profile({ reactions }: Props) {
  const [friends, setFriends] = useState<User[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  useEffect(() => {
    getUserFriends().then(setFriends);
    getWatchedMovies().then(setWatchedMovies);
  }, []);

  const handleDeleteFriend = (id: string) => {
    deleteFriendship(id).then(() => {
      setFriends((prev) => prev.filter((friend) => friend._id !== id));
    });
  };
  return (
    <div>
      <div className="py-8 flex gap-5">
        <div className="bg-dark-gray w-1/4 p-5 rounded-2xl">
          <p className="text-2xl mb-5">Odgledano filmova</p>
          <div className="flex justify-between">
            <p className="text-2xl ">
              {watchedMovies ? watchedMovies.length : 0}
            </p>
            <Image
              src="/icons/movie.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
        <div className="bg-dark-gray w-1/4 p-5 rounded-2xl">
          <p className="text-2xl mb-5">Broj prijatelja</p>
          <div className="flex justify-between">
            <p className="text-2xl ">{friends.length}</p>
            <Image
              src="/icons/friends.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
        <div className="bg-dark-gray w-1/4 p-5 rounded-2xl">
          <p className="text-xl mb-5">Reakcije</p>
          <div className="flex justify-between">
            <p className="text-2xl ">{reactions ? reactions.length : 0}</p>
            <Image
              src="/icons/recommend.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
        <div className="bg-dark-gray w-1/4 p-5 rounded-2xl">
          <p className="text-2xl mb-5">Odgledano filmova</p>
          <div className="flex justify-between">
            <p className="text-2xl ">
              {watchedMovies ? watchedMovies.length : 0}
            </p>
            <Image
              src="/icons/movie.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-1/2 bg-dark-gray rounded-2xl">
          <div className="flex items-center gap-4 border-color border-b p-5">
            <Image
              src="/icons/theaters.svg"
              alt="theaters-icon"
              width={40}
              height={45}
            />
            <p className="text-2xl">Poslednje pogledani filmovi</p>
          </div>
          <div className="p-5">
            <table className="w-full">
              <thead>
                <tr className="border-color border-b">
                  <th className="py-2 text-left gray-text font-normal">
                    NASLOV
                  </th>
                  <th className="py-2 text-left gray-text font-normal">
                    KATEGORIJA
                  </th>
                  <th className="py-2 text-left gray-text font-normal">IMDB</th>
                </tr>
              </thead>
              <tbody>
                {watchedMovies &&
                  watchedMovies.map((m) => (
                    <tr key={m._id}>
                      <td className="py-2 text-left">{m.title}</td>
                      <td className="py-2 text-left">
                        {m.categories.map((c) => c.name).join(", ")}
                      </td>
                      <td className="py-2 flex items-center gap-1 text-left">
                        <Image
                          src="/icons/kid_star.svg"
                          alt="star-icon"
                          width={15}
                          height={14}
                        />
                        <p>{m.imdb}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/2 bg-dark-gray rounded-lg">
          <div className="flex items-center gap-4 border-b p-5">
            <Image
              src="/icons/friends.svg"
              alt="friends-icon"
              width={58}
              height={45}
            />
            <p className="text-2xl">Prijatelji sa kojima ste gledali filmove</p>
          </div>
          <div className="p-5">
            <table className="w-full">
              <thead>
                <tr className="border-color border-b">
                  <th className="py-2 text-left gray-text font-normal">
                    IME I PREZIME
                  </th>
                  <th className="py-2 text-left gray-text font-normal">
                    EMAIL ADRESA
                  </th>
                </tr>
              </thead>
              <tbody>
                {friends &&
                  friends.map((u) => (
                    <tr key={u._id}>
                      <td className="py-2 text-left">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="py-2 text-left">{u.email}</td>
                      <td className="py-2 text-left">
                        <Icon
                          icon="person_cancel"
                          variation="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteFriend(u._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
