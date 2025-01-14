"use client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ButtonActions } from "./types";
import { buttonActions } from "./actions";

type Props = {
  children: ReactNode;
};

const ButtonActionContext = createContext<ButtonActions | undefined>(undefined);

export const ButtonActionProvider = ({ children }: Props) => {
  return (
    <ButtonActionContext.Provider value={buttonActions}>
      {children}
    </ButtonActionContext.Provider>
  );
};

export const useButtonActions = () => useContext(ButtonActionContext);
