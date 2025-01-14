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

export const columns = [
  { name: "NASLOV FILMA", uid: "title" },
  { name: "DATUM DODAVANJA", uid: "date" },
  { name: "KREATOR", uid: "creator" },
  { name: "AKCIJE", uid: "actions" },
];

export const movies = [
  {
    id: 1,
    title: "Interstellar",
    image: "/images/interstellar.png",
    date: "20. Decembar, 2024",
    creator: "Admin",
  },
  {
    id: 2,
    title: "Hangover",
    image: "/images/hangover.png",
    date: "18. Decembar, 2024",
    creator: "Admin",
  },
  {
    id: 3,
    title: "Interstellar",
    image: "/images/interstellar.png",
    date: "20. Decembar, 2024",
    creator: "Admin",
  },
  {
    id: 4,
    title: "Hangover",
    image: "/images/hangover.png",
    date: "18. Decembar, 2024",
    creator: "Admin",
  },
  {
    id: 5,
    title: "Interstellar",
    image: "/images/interstellar.png",
    date: "20. Decembar, 2024",
    creator: "Admin",
  },
  {
    id: 6,
    title: "Hangover",
    image: "/images/hangover.png",
    date: "18. Decembar, 2024",
    creator: "Admin",
  },
];

export default function MoviesTable() {
  return (
    <Table aria-label="Tabela filmova">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid} className="bg-gray-600 py-4 text-start">
            {column.name}
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
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xl font-bold">{movie.title}</p>
              </div>
            </TableCell>
            <TableCell>{movie.date}</TableCell>
            <TableCell>
              <div className="px-6 py-1 bg-green-400 inline text-black rounded-xl">
                {movie.creator}
              </div>
            </TableCell>
            <TableCell className="max-w-24">
              <div className="flex gap-4">
                <div title="Pogledaj film" className="cursor-pointer">
                  <Icon icon="visibility" />
                </div>
                <div title="Obrisi film" className="cursor-pointer">
                  <Icon icon="delete" />
                </div>
                <div title="Preuzmi film" className="cursor-pointer">
                  <Icon icon="download" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
