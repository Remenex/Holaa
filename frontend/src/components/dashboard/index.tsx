"use client"
import Image from "next/image";
import Link from "next/link";
import Icon from "../lib/icon";
import { usePathname } from "next/navigation";

const links = [
  { link: "/dashboard", icon: "dashboard", title: "Kontrolna tabla" },
  { link: "/dashboard/people", icon: "people", title: "Korisnici" },
  { link: "/dashboard/movies", icon: "movie", title: "Filmovi" },
  { link: "/dashboard/settings", icon: "settings", title: "Podesavanja" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-80 dashboard-main p-8 h-[100vh] flex flex-col">
      <Link href="/"><Image src="/images/logo.svg" width={150} height={50} alt="Logo" /></Link>
      <h4 className="mt-24 gray-text mb-5 mx-4">MENI</h4>
      <div className="flex flex-col justify-between h-full">
        <div>
          {links.map((element) => {
            const isActive = pathname === element.link;
            return (
              <Link href={element.link} key={element.title}>
                <div
                  className={`w-full flex gap-2 px-4 py-2 hover:bg-gray-500 hover:bg-opacity-40 ${
                    isActive ? `bg-gray-500 bg-opacity-40` : ``
                  }`}
                >
                  <Icon icon={element.icon} />
                  <p className="text-2xl">{element.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="">
          <div className="w-full flex gap-2 px-4 py-2 hover:bg-gray-500 hover:bg-opacity-40 text-red-400">
            <Icon icon="logout" />
            <p className="text-2xl text-red-400">Odjavi se</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
