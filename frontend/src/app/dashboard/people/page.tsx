import PeopleTable from "@/components/dashboard/people-table";
import Link from "next/link";

export default function DashboardPeople() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between pb-8">
        <h2>Lista Korisnika</h2>
        <div className="flex items-center">
          <Link
            href="/dashboard"
            className="text-2xl gray-text hover:text-white"
          >
            Kontrolna Tabla
          </Link>
          <p className="text-2xl mx-2 gray-text">/</p>
          <p className="text-2xl text-blue-600">Lista Korisnika</p>
        </div>
      </div>

      <div className="w-full rounded-sm px-8 py-6 dashboard-main border border-gray-600">
        <PeopleTable/>
      </div>
    </div>
  );
}
