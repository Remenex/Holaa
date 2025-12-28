"use client";
import { Invite, InviteReceived } from "@/app/types/invite.type";
import NotificationLink from "@/components/lib/main-links/notificaiton-links";
import SimpleLink from "@/components/lib/main-links/simple-link";
import { useAuthUser } from "@/hooks/auth-user";
import { useSocket } from "@/hooks/socket";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MainHeader() {
  const user = useAuthUser();
  const invitesSocket = useSocket("invites");

  const [invites, setInvites] = useState<Invite[]>([]);

  const handleInvite = (payload: InviteReceived) => {
    payload.invite.fromUserId = payload.fromUserId;
    setInvites((prev) => [...prev, payload.invite]);
  };

  useEffect(() => {
    if (!user) return;
    const fetchInvites = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/invites/${user?._id}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          toast.error("Greska pri dobijanju notifikacija");
        }

        const data: Invite[] = await res.json();
        //console.log(data);

        setInvites(data);
      } catch (error) {
        toast.error("Greska pri dobijanju notifikacija", {
          description: error as string,
        });
      } finally {
      }
    };

    fetchInvites();
  }, [user]);

  useEffect(() => {
    if (invitesSocket) {
      invitesSocket.on("invite:received", handleInvite);

      return () => {
        invitesSocket.off("invite:received", handleInvite);
      };
    }
  }, [invitesSocket]);

  return (
    <div className="py-5 px-4 bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] flex flex-col gap-4 rounded-[50px]">
      <SimpleLink icon="home" title="POCETNA" url="/" />
      <SimpleLink icon="search" title="PRETRAZI" url="/movies" />
      <SimpleLink icon="person" title="PROFIL" url="/profile" />
      <NotificationLink icon="notifications" invites={invites} />
    </div>
  );
}
