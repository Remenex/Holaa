import NotificationLink from "@/components/lib/main-links/notificaiton-links";
import SimpleLink from "@/components/lib/main-links/simple-link";

export default function MainHeader() {

  const user = {name: "Djordje", lastname: "Ivanovic", image: "/images/aleksa.png", movie: "Lord of the Rings"} as User;

  return (
    <div className="py-5 px-4 bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] flex flex-col gap-4 rounded-[50px]">
      <SimpleLink icon="home" title="POCETNA" url="/" />
      <SimpleLink icon="search" title="PRETRAZI" url="/movies" />
      <SimpleLink icon="person" title="PROFIL" url="/profile" />
      <NotificationLink icon="notifications" user={user} />
    </div>
  );
}
