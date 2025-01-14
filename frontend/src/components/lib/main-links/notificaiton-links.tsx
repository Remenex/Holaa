import Image from "next/image";
import Icon from "../icon";
import Link from "next/link";

type Props = {
  icon: string;
  user: User;
};

export default function NotificationLink({ icon, user }: Props) {
  return (
    <div className="relative w-[70px] h-[70px] flex items-center justify-center group">
      <Image
        src="/images/gray-circle.svg"
        width={70}
        height={70}
        alt="Home"
        className="absolute top-0 left-0"
      />
      <Icon icon={icon} iconSize={35} variation="text-white" />

      <div
        className="w-[70px] h-full absolute top-0 right-0 rounded-[40px] border-0 flex items-center
          overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[550px] group-hover:border-[#ff581c] group-hover:border-4 group-hover:h-[200px] group-hover:notification-gradient"
      >
        <div className="ml-5 opacity-0 transition-opacity duration-300 ease-in-out flex flex-col justify-start group-hover:opacity-100">
          <h2 className="text-3xl font-display ">ZAHTEV ZA GLEDANJE FILMA</h2>
          <div className="flex items-start mt-4 gap-3 ">
            <Image src={user.image} width={40} height={40} alt={user.name} />
            <div>
              <p className="text-2xl leading-6">
                <b>
                  {user.name} {user.lastname}
                </b>{" "}
                vas poziva da zajedno gledate “<b>{user.movie}</b>”
              </p>

              <div className="mt-4 flex gap-3">
                <Link href="">
                  <div className="px-4 py-1 bg-[#52b561] flex items-center rounded-[20px]">
                    <Icon icon="check" />
                    <p>Prihvati</p>
                  </div>
                </Link>
                <Link href="">
                  <div className="px-4 py-1 bg-[#c01e1e] flex items-center rounded-[20px]">
                    <Icon icon="close" />
                    <p>Odbij</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
