"use client";
import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import Profile from "@/components/li/profile";
import Reactions from "@/components/li/reactions";
import UserSettings from "@/components/li/settings";
import BgImageOverlay from "@/components/lib/bg-image";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profil");

  return (
    <div className="w-full">
      <Header />
      <BgImageOverlay bigTitle="MOJ NALOG" linkTitle="PROFIL" />
      <div className="w-full flex justify-center">
        <div className="p-12 w-full max-w-[1600px]">
          <div className="w-full bg-dark-gray flex justify-between py-3 px-10 rounded-2xl">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/user-profile.svg"
                alt="user-icon"
                width={60}
                height={60}
              />
              <div className="mr-10">
                <p className="text-2xl">Aleksa Jovanovic</p>
                <p className="text-base gray-text">jaleksa388@gmail.com</p>
              </div>
              <div className="flex gap-8">
                {["Profil", "Reakcije", "Podesavanja"].map((tab) => (
                  <p
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 cursor-pointer ${
                      activeTab === tab
                        ? "bg-clip-text text-white bg-custom-gradient"
                        : "text-gray-400"
                    }`}
                    style={
                      activeTab === tab
                        ? {
                            borderBottom: "2px solid transparent",
                            borderImage: "var(--custom-gradient) 1",
                          }
                        : {
                            borderBottom: "2px solid transparent",
                          }
                    }
                  >
                    {tab}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-base gray-text">Odjavi se</p>
              <Image
                src="/icons/logout.svg"
                alt="logout-icon"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div className="mt-8">
            {activeTab === "Profil" && <Profile />}
            {activeTab === "Reakcije" && <Reactions />}
            {activeTab === "Podesavanja" && <UserSettings/> } 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
