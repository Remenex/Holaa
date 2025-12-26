import { useAuthUser } from "@/hooks/auth-user";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(namespace: string) {
  const user = useAuthUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) return;

    const s = io(`http://localhost:8001/${namespace}`, {
      auth: { userId: user._id },
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [user, namespace]);

  return socket;
}
