"use client";
import { Invite, InviteReceived } from "@/app/types/invite.type";
import NotificationLink from "@/components/lib/main-links/notificaiton-links";
import SimpleLink from "@/components/lib/main-links/simple-link";
import { useAuthUser } from "@/hooks/auth-user";
import { useSocket } from "@/hooks/socket";
import { getUserInvites } from "@/services/invites.service";
import { useEffect, useState } from "react";

export default function MainHeader() {
  const user = useAuthUser();
  const invitesSocket = useSocket("invites");

  const [invites, setInvites] = useState<Invite[]>([]);

  const handleInvite = (payload: InviteReceived) => {
    payload.invite.fromUserId = payload.fromUserId;
    setInvites((prev) => {
      const filtered = prev.filter(
        (invite) => invite._id !== payload.invite._id
      );

      return [...filtered, payload.invite];
    });
  };

  useEffect(() => {
    if (!user) return;
    getUserInvites(user._id).then(setInvites);
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
