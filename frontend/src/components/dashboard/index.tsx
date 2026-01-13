"use client";
import Image from "next/image";
import Link from "next/link";
import Icon from "../lib/icon";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/services/auth.service";
import { useContext } from "react";
import UserContext from "@/context/user-context";
import { useAuthUser } from "@/hooks/auth-user";

const links = [
  { link: "/dashboard", icon: "people", title: "Korisnici" },
  { link: "/dashboard/movies", icon: "movie", title: "Filmovi" },
  { link: "/dashboard/settings", icon: "settings", title: "Podesavanja" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthUser();
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await signOut();
      if (!res) toast.error("Doslo je do greske prilikom odjave");
      setUser(null);
      router.replace("/login");
    } catch (err) {
      toast.error("Greska prilikom odjave");
    }
  };

  return (
    <div className="w-full max-w-80 bg-dark-gray p-8 h-[100vh] flex flex-col">
      <Link href="/">
        <Image src="/images/logo.svg" width={150} height={50} alt="Logo" />
      </Link>
      <h4 className="mt-24 gray-text mb-5 mx-4">MENI</h4>
      <div className="flex flex-col justify-between h-full">
        <div>
          {links.map((element) => {
            const isActive = pathname === element.link;
            return (
              <Link href={element.link} key={element.title}>
                <div
                  className={`w-full flex gap-2 px-4 py-2 hover:bg-zinc-900 ${
                    isActive ? `bg-zinc-800` : ``
                  }`}
                >
                  <Icon icon={element.icon} />
                  <p className="text-2xl">{element.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="" onClick={handleLogout}>
          <div className="w-full flex gap-2 px-4 py-2 hover:bg-zinc-900 text-red-400">
            <Icon icon="logout" />
            <p className="text-2xl text-red-400">Odjavi se</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
