"use client";
import { getAuthUser } from "@/services/users.service";
import { createContext, ReactNode, useEffect, useState } from "react";

const UserContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getAuthUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
