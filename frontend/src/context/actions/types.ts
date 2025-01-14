import type { buttonActions } from "./actions";

export type ButtonActions = typeof buttonActions;
export type ButtonActionParams<T> = T extends (...args: infer P) => void
  ? P
  : never;
