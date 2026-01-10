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
import { useEffect, useState } from "react";
import Icon from "../lib/icon";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
  video: string;
  createdAt: string;
  creator: string;
}

export const columns = [
  { name: "NASLOV FILMA", uid: "title" },
  { name: "DATUM DODAVANJA", uid: "date" },
  { name: "KREATOR", uid: "creator" },
  { name: "AKCIJE", uid: "actions" },
];

type Props = {
  refetch: boolean;
  changeRefetch: () => void;
};

export default function MoviesTable({ refetch, changeRefetch }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading || refetch) {
      setLoading(true);
      fetch(`${API_URL}/movies`)
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .then(() => changeRefetch())
        .finally(() => setLoading(false));
    }
  }, [refetch]);

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/movies/${id}`, {
      method: "DELETE",
    });

    setMovies((prev) => prev.filter((movie) => movie._id !== id));
  };

  const handleDownload = async (videoPath: string, title: string) => {
    try {
      const res = await fetch(`${API_URL}${videoPath}`);
      if (!res.ok) throw new Error("Failed to download file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Došlo je do greške prilikom preuzimanja.");
    }
  };

  if (loading) {
    return <p className="p-6">Učitavanje filmova...</p>;
  }

  return (
    <Table aria-label="Tabela filmova">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid} className="bg-gray-600 py-4 text-start">
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody emptyContent="Nema filmova">
        {movies.map((movie) => (
          <TableRow
            key={movie._id}
            className="border-b border-gray-600 hover:bg-gray-600"
          >
            {/* NASLOV */}
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={`${API_URL}${movie.thumbnail}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold">{movie.title}</p>
              </div>
            </TableCell>

            <TableCell>
              {new Date(movie.createdAt).toLocaleDateString("sr-Latn", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </TableCell>

            <TableCell>
              <div className="px-6 py-1 bg-green-400 inline-block text-black rounded-xl">
                Admin
              </div>
            </TableCell>

            <TableCell className="max-w-24">
              <div className="flex gap-4">
                <div title="Pogledaj film" className="cursor-pointer">
                  <Icon icon="visibility" />
                </div>

                <div
                  title="Obriši film"
                  className="cursor-pointer"
                  onClick={() => handleDelete(movie._id)}
                >
                  <Icon icon="delete" />
                </div>

                <div
                  title="Preuzmi film"
                  className="cursor-pointer"
                  onClick={() => handleDownload(movie.video, movie.title)}
                >
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
