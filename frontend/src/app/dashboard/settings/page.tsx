"use client";

import SettingsInput from "@/components/dashboard/settings-input";
import UserContext from "@/context/user-context";
import { useAuthUser } from "@/hooks/auth-user";
import { UpdateUser } from "@/services/auth.service";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const user = useAuthUser();
  const { setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleUpdateUser = async () => {
    if (!user) return;

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Ime i prezime su obavezni");
      return;
    }

    try {
      setIsLoading(true);

      await UpdateUser(user._id, {
        firstName,
        lastName,
      });

      setUser({
        ...user,
        firstName,
        lastName,
      });

      toast.success("Uspešno ažurirani podaci");
    } catch (err) {
      toast.error("Greška prilikom ažuriranja podataka");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-270">
      <div className="w-full flex items-center justify-between pb-8">
        <h2>Podešavanja</h2>

        <div className="flex items-center">
          <Link
            href="/dashboard"
            className="text-2xl gray-text hover:text-white"
          >
            Kontrolna tabla
          </Link>
          <p className="text-2xl mx-2 gray-text">/</p>
          <p className="text-2xl text-blue-600">Podešavanja</p>
        </div>
      </div>

      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-gray-600 shadow-default bg-dark-gray">
          <div className="border-b px-7 py-4 border-gray-600">
            <h3 className="font-medium text-white">Lične informacije</h3>
          </div>

          <div className="p-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUser();
              }}
            >
              <div className="mb-5 flex flex-col gap-4 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <SettingsInput
                    label="Ime"
                    icon="person"
                    placeholder="Unesite vaše ime"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <SettingsInput
                    label="Prezime"
                    icon="person"
                    placeholder="Ivanović"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5">
                <SettingsInput
                  label="Email adresa"
                  icon="mail"
                  placeholder="email@example.com"
                  value={user?.email ?? ""}
                  name="email"
                  disabled
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-white hover:shadow-1"
                >
                  Otkaži
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center rounded bg-blue-400 px-6 py-2 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
                >
                  {isLoading ? "Čuvanje..." : "Sačuvaj"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
