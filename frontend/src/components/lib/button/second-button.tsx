"use client";
import { useButtonActions } from "@/context/actions";
import { useMemo } from "react";
import type {
  ButtonActionParams,
  ButtonActions,
} from "@/context/actions/types";
import type { ButtonProps } from "./types";

export default function SecondButton<K extends keyof ButtonActions>({
  text,
  iconImage,
  iconSize,
  className,
  actionId,
  actionParams,
  backgroundColor,
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
    <div className="light-gradient rounded-[30px] p-[1px]">
      <button
        className={`py-4 px-8 rounded-[30px] ${backgroundColor ?? `bg-dark-gray`} text-white font-bold text-[18px] flex items-center transparent`}
        onClick={handleClick}
      >
        {iconImage && (
          <span
            className={`material-symbols-rounded select-none quoteIconSettings`}
            style={{ fontSize: `${iconSize}px` }}
          >
            {iconImage}
          </span>
        )}
        {text}
      </button>
    </div>
  );
}
