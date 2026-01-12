import Button from "@/components/lib/button";
import UserSettingsInput from "../profile/settings";
import { useContext, useState } from "react";
import { toast } from "sonner";
import UserContext from "@/context/user-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type props = {
  user: User;
};

export default function UserSettings({ user }: props) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      const newUser = { ...user, firstName: firstName, lastName: lastName };

      setUser(newUser);
      toast.success("Profil uspešno ažuriran");
    } catch (err) {
      toast.error("Greška prilikom ažuriranja profila");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warning("Lozinke se ne poklapaju");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Greška prilikom promene lozinke");
      }

      toast.success("Lozinka uspešno promenjena");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Greška prilikom promene lozinke");
    }
  };

  return (
    <div className="w-full p-10 bg-dark-gray rounded-2xl flex gap-10">
      <div className="p-8 bg-background rounded-2xl w-full">
        <p className="text-2xl mb-5 font-semibold">Podaci o profilu</p>
        <form onSubmit={handleProfileSubmit} className="w-full">
          <div className="flex w-full gap-5 mb-5">
            <UserSettingsInput
              label="Ime"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <UserSettingsInput
              label="Prezime"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <UserSettingsInput
            label="Email"
            name="email"
            value={user.email}
            disabled
          />

          <Button
            text="SAČUVAJ PROMENE"
            small
            className="mt-10"
            type="submit"
          />
        </form>
      </div>

      <div className="p-8 bg-background rounded-2xl w-full">
        <p className="text-2xl mb-5 font-semibold">Promena lozinke</p>
        <form onSubmit={handlePasswordSubmit} className="w-full">
          <div className="flex w-full gap-5 mb-5">
            <UserSettingsInput
              label="Stara loznika"
              placeholder="Trenutna lozinka"
              isPassword={true}
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <UserSettingsInput
              label="Nova lozinka"
              placeholder="Nova lozinka"
              isPassword={true}
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <UserSettingsInput
            label="Potvrdite novu lozinku"
            placeholder="Nova lozinka"
            isPassword={true}
            name="confirmedNewPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            text="SACUVAJ PROMENE"
            small={true}
            className="mt-10"
            disabled={
              newPassword.trim() === "" ||
              oldPassword.trim() === "" ||
              confirmPassword.trim() === ""
            }
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
