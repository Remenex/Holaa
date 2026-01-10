import UserContext from "@/context/user-context";
import { useContext } from "react";

export const useAuthUser = () => {
  return useContext(UserContext).user;
};
