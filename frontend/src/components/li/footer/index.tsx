"use client";
import RedirectButton from "@/components/lib/button/redirect-button";
import RedirectButtonSecond from "@/components/lib/button/redirect-button-second";
import Logo from "@/components/lib/logo";
import SocialLinks from "@/components/lib/social";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full left-0 pt-24 flex flex-col items-center justify-start bg-dark-gray rounded-t-[100px] mt-[150px]">
      <div className="w-full main-container flex items-center flex-col">
        <div className="w-full flex align-top justify-between max-w-[1600px] pb-24">
          <div className="">
            <Logo width={200} />
            <p className="mt-5 gray-text text-2xl">
              Pronadji nas na drustvenim mrezama
            </p>
            <div>
              <SocialLinks />
            </div>
          </div>

          <div>
            <h2>PRETRAZI PO KATEGORIJAMA</h2>
            <div className="flex justify-between">
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <Link
                    href="/categories/action"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Akcija
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/comedy"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Komedija
                  </Link>
                </li>
                <li>
                  <a
                    href=""
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Drama
                  </a>
                </li>
                <li>
                  <Link
                    href="/categories/romanse"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Romansa
                  </Link>
                </li>
              </ul>
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <Link
                    href="/categories/family"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Porodicni
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/scifi"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Sci-Fi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/triller"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Trileri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/horor"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Horor
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>BRZI LINKOVI</h2>
            <div className="flex justify-between">
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <Link
                    href="/"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Pocetna
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Prijava
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Registracija
                  </Link>
                </li>
                <li>
                  <Link
                    href="/movies"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Pretrazi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/movies"
                    className="gray-text text-2xl hover:text-white duration-300"
                  >
                    Filmovi
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-80">
            <h2>GLEDAJ FILOVE SA SBOJIM PRIJATELJIMA</h2>
            <div className="mt-7 flex gap-4">
              <RedirectButton
                text="Prijava"
                className="block sm:hidden"
                url="/login"
              />
              <RedirectButtonSecond
                text="Registracija"
                className="block sm:hidden"
                url="/register"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 w-full max-w-[1600px] py-12 text-center">
          <p className="text-2xl">© Remenex {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
