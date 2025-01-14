"use client";
import { useButtonActions } from "@/context/actions";
import type {
  ButtonActionParams,
  ButtonActions,
} from "@/context/actions/types";
import { useMemo } from "react";
import type { ButtonProps } from "./types";

export default function Button<K extends keyof ButtonActions>({
  text,
  iconImage,
  iconSize,
  className,
  actionId,
  actionParams,
  iconMargin,
  small,
}: ButtonProps<K>) {
  const buttonActions = useButtonActions();

  const handleClick = useMemo(() => {
    if (!buttonActions) return undefined;

    const action = buttonActions[actionId] as (
      ...args: ButtonActionParams<ButtonActions[K]>
    ) => void;

    if (action) {
      return () => action(...actionParams);
    }
    return undefined;
  }, [buttonActions, actionId, actionParams]);

  return (
    <button
      className={`${small ? `px-4 py-2 rounded-lg` : `py-4 px-8 rounded-[30px]`} main-gradient text-white font-bold text-[18px] flex items-center duration-300 hover:hover-gradient`}
      onClick={handleClick}
    >
      {iconImage && (
        <span
          className={`material-symbols-rounded select-none quoteIconSettings`}
          style={{ fontSize: `${iconSize}px`, marginRight: `${iconMargin}px` }}
        >
          {iconImage}
        </span>
      )}
      {text}
    </button>
  );
}
