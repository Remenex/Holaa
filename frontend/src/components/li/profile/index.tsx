import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <div className="py-8 flex gap-5">
        <div className="bg-dark-gray w-1/4 p-5 rounded-lg">
          <p className="text-xl mb-5">Odgledano filmova</p>
          <div className="flex justify-between">
            <p className="text-xl ">25</p>
            <Image
              src="/icons/movie.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
        <div className="bg-dark-gray w-1/4 p-5 rounded-lg">
          <p className="text-xl mb-5">Broj prijatelja</p>
          <div className="flex justify-between">
            <p className="text-xl ">10</p>
            <Image
              src="/icons/friends.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
        <div className="bg-dark-gray w-1/4 p-5 rounded-lg">
          <p className="text-xl mb-5">Reakcije</p>
          <div className="flex justify-between">
            <p className="text-xl ">24</p>
            <Image
              src="/icons/recommend.svg"
              alt="movie-icon"
              width={26}
              height={21.6}
            />
          </div>
        </div>
        <div className="bg-dark-gray w-1/4 p-5 rounded-lg">
          <p className="text-xl mb-5">Odgledano filmova</p>
          <div className="flex justify-between">
            <p className="text-xl ">25</p>
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
        <div className="w-1/2 bg-dark-gray rounded-lg">
          <div className="flex items-center gap-4 border-color border-b p-5">
            <Image
              src="/icons/theaters.svg"
              alt="theaters-icon"
              width={40}
              height={45}
            />
            <p className="text-xl">Poslednje pogledani filmovi</p>
          </div>
          <div className="p-5">
            <table className="w-full">
              <tr className="border-color border-b">
                <th className="py-2 text-left gray-text font-normal">NASLOV</th>
                <th className="py-2 text-left gray-text font-normal">
                  KATEGORIJA
                </th>
                <th className="py-2 text-left gray-text font-normal">IMDB</th>
              </tr>
              <tr>
                <td className="py-2 text-left">The Lord Of The Rings</td>
                <td className="py-2 text-left">Film, Drama</td>
                <td className="py-2 flex items-center gap-1 text-left">
                  <Image
                    src="/icons/kid_star.svg"
                    alt="star-icon"
                    width={15}
                    height={14}
                  />
                  <p>9.2</p>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-left">The Lord Of The Rings</td>
                <td className="py-2 text-left">Film, Drama</td>
                <td className="py-2 flex items-center gap-1 text-left">
                  <Image
                    src="/icons/kid_star.svg"
                    alt="star-icon"
                    width={15}
                    height={14}
                  />
                  <p>9.2</p>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-left">The Lord Of The Rings</td>
                <td className="py-2 text-left">Film, Drama</td>
                <td className="py-2 flex items-center gap-1 text-left">
                  <Image
                    src="/icons/kid_star.svg"
                    alt="star-icon"
                    width={15}
                    height={14}
                  />
                  <p>9.2</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="w-1/2 bg-dark-gray rounded-lg">
          <div className="flex items-center gap-4 border-color border-b p-5">
            <Image
              src="/icons/friends.svg"
              alt="friends-icon"
              width={58}
              height={45}
            />
            <p className="text-xl">Prijatelji sa kojima ste gledali filmove</p>
          </div>
          <div className="p-5">
            <table className="w-full">
              <tr className="border-color border-b">
                <th className="py-2 text-left gray-text font-normal">
                  IME I PREZIME
                </th>
                <th className="py-2 text-left gray-text font-normal">
                  EMAIL ADRESA
                </th>
              </tr>
              <tr>
                <td className="py-2 text-left">Djordje Ivanovic</td>
                <td className="py-2 text-left">idjordje63@gmail.com</td>
              </tr>
              <tr>
                <td className="py-2 text-left">Djordje Ivanovic</td>
                <td className="py-2 text-left">idjordje63@gmail.com</td>
              </tr>
              <tr>
                <td className="py-2 text-left">Djordje Ivanovic</td>
                <td className="py-2 text-left">idjordje63@gmail.com</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
