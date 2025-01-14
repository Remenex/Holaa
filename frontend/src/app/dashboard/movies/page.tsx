"use client";
import MoviesTable from "@/components/dashboard/movies-table";
import Icon from "@/components/lib/icon";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import AddNewMovie from "./add-new-movie";

export default function Movies() {
  const [addMovie, setAddMovie] = useState(false);
  const handleAddMovie = () => {
    setAddMovie(!addMovie);
  };
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between pb-8">
        <h2>Lista Filmova</h2>
        <div className="flex items-center">
          <Link
            href="/dashboard"
            className="text-2xl gray-text hover:text-white"
          >
            Kontrolna Tabla
          </Link>
          <p className="text-2xl mx-2 gray-text">/</p>
          <p className="text-2xl text-blue-600">Lista Filmova</p>
        </div>
      </div>
      <div className="w-full rounded-sm px-8 py-6 dashboard-main border border-gray-600">
        <div className="w-full flex justify-end">
          <Link
            href=""
            className="px-8 py-4 border border-gray-600 rounded-2xl text-xl mb-8 flex items-center gap-2 duration-300 hover:bg-white hover:text-black mr-4"
            onClick={handleAddMovie}
          >
            <Icon icon="add" />
            Dodaj Novi Film
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: addMovie ? 1 : 0,
            height: addMovie ? 750 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <AddNewMovie close={handleAddMovie} />
        </motion.div>
        <MoviesTable />
      </div>
    </div>
  );
}
