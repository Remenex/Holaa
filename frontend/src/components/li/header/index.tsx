import RedirectButton from "@/components/lib/button/redirect-button";
import Icon from "@/components/lib/icon";
import Logo from "@/components/lib/logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-center main-container fixed top-0 left-[50%] -translate-x-[50%] z-10">
      <div className="w-full max-w-[1600px] backdrop-blur-md bg-white/[.1] rounded-b-[30px] px-10 py-5 flex justify-between align-middle">
        <Logo />
        <nav className="flex justify-center items-center">
          <ul className="flex gap-5">
            <li>
              <Link href="/" className="flex items-center text-xl gap-1">
                <Icon icon="home" iconSize={22} />
                POCETNA
              </Link>
            </li>
            <li>
              <Link href="/home" className="flex items-center text-xl gap-1">
                <Icon icon="movie" iconSize={22} />
                FILMOVI
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="flex items-center text-xl gap-1"
              >
                <Icon icon="category" iconSize={22} />
                KATEGORIJE
              </Link>
            </li>
            <li>
              <Link href="/home" className="flex items-center text-xl gap-1">
                <Icon icon="person" iconSize={22} />
                PROFIL
              </Link>
            </li>
          </ul>
        </nav>
        <RedirectButton
          text="POPULARNI FILMOVI"
          className=""
          iconImage="crown"
          iconSize={30}
          iconMargin="10"
          url=""
        />
      </div>
    </header>
  );
}
