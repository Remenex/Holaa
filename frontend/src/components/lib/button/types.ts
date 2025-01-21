import { ButtonActions } from "@/context/actions/types";

type ButtonActionParams<T> = T extends (...args: infer P) => void ? P : never;

type RequiredButtonProps<K extends keyof ButtonActions> = {
  text: string;
  iconMargin?: string;
  className?: string;
  actionId: K;
  actionParams: ButtonActionParams<ButtonActions[K]> | null;
  backgroundColor?: string;
  small?: boolean;
};

type OptionalIconProp = {
  iconImage?: string;
  iconSize?: number;
};

export type ButtonProps<K extends keyof ButtonActions> = 
  RequiredButtonProps<K> & OptionalIconProp;
