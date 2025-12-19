import Button from "@/components/lib/button";
import UserSettingsInput from "../profile/settings";

export default function UserSettings() {
  const handleSubmit = () => {
    alert("Form submitted");
  };
  const handleChangePasswordForm = () => {
    alert("Form submitted");
  };

  return (
    <div className="w-full p-10 bg-dark-gray rounded-2xl flex gap-10">
      <div className="p-8 bg-background rounded-2xl w-full">
        <p className="text-2xl mb-5 font-semibold">Podaci o profilu</p>
        <form action="#" className="w-full">
          <div className="flex w-full gap-5">
            <UserSettingsInput
              label="Ime"
              placeholder="Unesite svoje ime"
              defaultValue="Djordje"
              name="firtName"
            />
            <UserSettingsInput
              label="Prezime"
              placeholder="Unesite svoje prezime"
              defaultValue="Ivanovic"
              name="secondName"
            />
          </div>
          <UserSettingsInput
            label="Email"
            placeholder="Unesite svoju email adresu"
            defaultValue="idjordje63@gmail.com"
            name="emailAddress"
            disabled={true}
          />
          <Button
            text="PRIJAVA"

            small={true}
            className="mt-10"
          />
        </form>
      </div>

      <div className="p-8 bg-background rounded-2xl w-full">
        <p className="text-2xl mb-5 font-semibold">Promena lozinke</p>
        <form action="#" className="w-full">
          <div className="flex w-full gap-5">
            <UserSettingsInput
              label="Stara loznika"
              placeholder=""
              defaultValue=""
              name="oldPassword"
              isPassword={true}
            />
            <UserSettingsInput
              label="Nova lozinka"
              placeholder=""
              defaultValue=""
              name="newPassword"
              isPassword={true}
            />
          </div>
          <UserSettingsInput
            label="Potvrdite novu lozinku"
            placeholder=""
            defaultValue=""
            name="confirmedNewPassword"
            isPassword={true}
          />
          <Button
            text="PRIJAVA"
            small={true}
            className="mt-10"
          />
        </form>
      </div>
    </div>
  );
}
