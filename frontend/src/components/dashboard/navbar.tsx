"use client";
import { Search } from "../ui/search";
import UserDropdown from "../user-dropdown";

const placeholders = [
  "Unesti tekst za pretragu",
  "Pretrazite filmove",
  "Pretrazite korisnike",
];

export default function DashboardNavbar() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="w-full px-8 py-5 flex justify-between dashboard-main items-center">
      <Search
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        center={false}
      />
      <div className="flex items-center gap-4">
        <div>
          <h4>Djordje Ivanovic</h4>
          <p className="gray-text text-xl">Admin</p>
        </div>
        <UserDropdown />
      </div>
    </div>
  );
}
