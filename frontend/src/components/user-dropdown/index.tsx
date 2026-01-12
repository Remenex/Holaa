"use client";
import { useAuthUser } from "@/hooks/auth-user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import Icon from "../lib/icon";
import { ModernIcon } from "../lib/modern-icon";
import UserAvatar from "../lib/user-avatar";
import { useContext } from "react";
import UserContext from "@/context/user-context";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserDropdown() {
  const user = useAuthUser();
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      setUser(null);

      router.replace("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="opacity-100">
          <button className="outline-none ">
            {user ? (
              <UserAvatar
                firstname={user.firstName}
                lastname={user.lastName}
                sizeRem={4}
              />
            ) : (
              <ModernIcon icon="person" />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="w-full min-w-[250px] bg-dark-gray rounded-xl px-3 py-5"
        >
          {user ? (
            <DropdownItem key="info" className="gap-2 mb-3">
              <p className="font-semibold text-xl">Prijavljeni ste kao</p>
              <p className="font-semibold text-xl">{user?.email}</p>
            </DropdownItem>
          ) : (
            <DropdownItem key="profile">
              <Link href="/login" className="text-xl hover:underline">
                Prijavi se
              </Link>
            </DropdownItem>
          )}

          {user && user.role === "user" ? (
            <DropdownItem key="profile">
              <Link href="/profile" className="text-xl hover:underline">
                Profil
              </Link>
            </DropdownItem>
          ) : null}
          {user && user.role === "admin" ? (
            <DropdownItem key="dashboard">
              <Link href="/dashboard" className="text-xl hover:underline">
                Kontrolna tabla
              </Link>
            </DropdownItem>
          ) : null}
          {user ? (
            <DropdownItem key="settings">
              <Link
                href={
                  user.role === "admin" ? "/dashboard/settings" : "/profile"
                }
                className="text-xl hover:underline"
              >
                Podesavanja
              </Link>
            </DropdownItem>
          ) : null}
          {user ? (
            <DropdownItem key="signout">
              <Link
                href=""
                className="text-xl hover:underline flex text-red-500"
                onClick={handleLogout}
              >
                <Icon icon="Logout" />
                Odjavi se
              </Link>
            </DropdownItem>
          ) : null}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
