"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/react";
import Icon from "../lib/icon";
import { useEffect, useState } from "react";
import UserAvatar from "../lib/user-avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const columns = [
  { name: "IME I PREZIME", uid: "firstName" },
  { name: "EMAIL", uid: "email" },
  { name: "DATUM KREIRANJA NALOGA", uid: "createdAt" },
  { name: "AKCIJE", uid: "actions" },
];

export default function PeopleTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortState, setSortState] = useState<{
    key: keyof User | "";
    order: "ASC" | "DESC" | "";
  }>({
    key: "",
    order: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleUsers = (key: keyof User, order: "ASC" | "DESC") => {
    setSortState({ key, order });

    setUsers((prev) =>
      [...prev].sort((a, b) => {
        let compareA: string | number = a[key];
        let compareB: string | number = b[key];

        if (key === "createdAt") {
          compareA = new Date(a.createdAt).getTime();
          compareB = new Date(b.createdAt).getTime();
        }

        if (order === "ASC") {
          return compareA > compareB ? 1 : compareA < compareB ? -1 : 0;
        }

        return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
      })
    );
  };

  const handleDelete = async (userId: string) => {
    await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
    });

    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <Table aria-label="Tabela korisnika">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid} className="bg-zinc-800 py-4 text-start">
            <div className="flex gap-3">
              {column.name}
              {column.name !== "AKCIJE" && (
                <div className="flex">
                  <Icon
                    icon="arrow_drop_down"
                    variation={`cursor-pointer 
                        ${
                          sortState.key === column.uid &&
                          sortState.order === "DESC"
                            ? `text-blue-600`
                            : `text-white`
                        }
                        `}
                    onClick={() =>
                      handleUsers(column.uid as keyof User, "DESC")
                    }
                  />
                  <Icon
                    icon="arrow_drop_up"
                    variation={`cursor-pointer
                        ${
                          sortState.key === column.uid &&
                          sortState.order === "ASC"
                            ? `text-blue-600`
                            : `text-white`
                        }
                        `}
                    onClick={() => handleUsers(column.uid as keyof User, "ASC")}
                  />
                </div>
              )}
            </div>
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user._id}
            className="border-b border-gray-600 hover:bg-zinc-900"
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16">
                  <UserAvatar
                    firstname={user.firstName}
                    lastname={user.lastName}
                    sizeRem={60 / 16}
                  />
                </div>
                <p className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString("sr-Latn", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </TableCell>
            <TableCell className="max-w-24">
              <div className="flex gap-4">
                <div
                  title="Pogledaj profil korisnika"
                  className="cursor-pointer"
                >
                  <Icon icon="visibility" />
                </div>
                <div
                  title="Obrisi korisnika"
                  className="cursor-pointer"
                  onClick={() => handleDelete(user._id)}
                >
                  <Icon icon="delete" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
