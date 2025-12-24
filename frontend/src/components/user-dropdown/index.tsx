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

export default function UserDropdown() {
  const user = useAuthUser();
  console.log(user);

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="opacity-100">
          <button className="outline-none">
            <ModernIcon icon="person" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="w-full min-w-[250px] bg-dark-gray rounded-xl px-3 py-5"
        >
          <DropdownItem key="info" className="gap-2 mb-3">
            <p className="font-semibold text-xl">Prijavljeni ste kao</p>
            <p className="font-semibold text-xl">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="profile">
            <Link href="/profile" className="text-xl hover:underline">
              Profil
            </Link>
          </DropdownItem>
          <DropdownItem key="dashboard">
            <Link href="/dashboard" className="text-xl hover:underline">
              Kontrolna tabla
            </Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href="/settings" className="text-xl hover:underline">
              Podesavanja
            </Link>
          </DropdownItem>
          <DropdownItem key="signout">
            <Link href="" className="text-xl hover:underline flex text-red-500">
              <Icon icon="Logout" />
              Odjavi se
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
