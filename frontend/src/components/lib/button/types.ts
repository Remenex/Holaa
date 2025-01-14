import type {
  ButtonActionParams,
  ButtonActions,
} from "@/context/actions/types";

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
