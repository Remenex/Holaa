"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/react";
import Image from "next/image";
import Icon from "../lib/icon";
import { useState } from "react";

export const columns = [
  { name: "IME I PREZIME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "DATUM KREIRANJA NALOGA", uid: "date" },
  { name: "AKCIJE", uid: "actions" },
];

export const moviesBase = [
  {
    id: 1,
    name: "Djordje Ivanovic",
    image: "/images/djordje.png",
    date: "20. Decembar, 2024",
    email: "idjordje63@gmail.com",
  },
  {
    id: 2,
    name: "Aleksa Jovanovic",
    image: "/images/aleksa.png",
    date: "18. Decembar, 2024",
    email: "jaleksa388@gmail.com",
  },
  {
    id: 3,
    name: "Radisa Trajkovic",
    image: "/images/djani.png",
    date: "20. Decembar, 2024",
    email: "djani@gmail.com",
  },
  {
    id: 4,
    name: "Djordje Ivanovic",
    image: "/images/djordje.png",
    date: "18. Decembar, 2024",
    email: "idjordje63@gmail.com",
  },
  {
    id: 5,
    name: "Aleksa Jovanovic",
    image: "/images/aleksa.png",
    date: "20. Decembar, 2024",
    email: "jaleksa388@gmail.com",
  },
  {
    id: 6,
    name: "Radisa Trajkovic",
    image: "/images/djani.png",
    date: "18. Decembar, 2024",
    email: "djani@gmail.com",
  },
];

export default function PeopleTable() {
  const [movies, setMovies] = useState(moviesBase);
  const [sortState, setStortState] = useState({ key: "", order: "" });

  const handleMovies = (key: string, order: string) => {
    setStortState({ key, order });
    const sortedMovies = [...movies].sort((a, b) => {
      let valA = a[key as keyof typeof a];
      let valB = b[key as keyof typeof b];

      if (key === "date") {
        valA = new Date(valA as string).getTime();
        valB = new Date(valB as string).getTime();
      }

      if (order === "ASC") {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });
    setMovies(sortedMovies);
  };
  return (
    <Table aria-label="Tabela korisnika">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid} className="bg-gray-600 py-4 text-start">
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
                    onClick={() => handleMovies(column.uid, "DESC")}
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
                    onClick={() => handleMovies(column.uid, "ASC")}
                  />
                </div>
              )}
            </div>
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {movies.map((movie) => (
          <TableRow
            key={movie.id}
            className="border-b border-gray-600 hover:bg-gray-600"
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16">
                  <Image
                    src={movie.image}
                    width={60}
                    height={60}
                    alt={movie.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xl font-bold">{movie.name}</p>
              </div>
            </TableCell>
            <TableCell>{movie.email}</TableCell>
            <TableCell>{movie.date}</TableCell>
            <TableCell className="max-w-24">
              <div className="flex gap-4">
                <div
                  title="Pogledaj profil korisnika"
                  className="cursor-pointer"
                >
                  <Icon icon="visibility" />
                </div>
                <div title="Obrisi korisnika" className="cursor-pointer">
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
