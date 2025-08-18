import { Dispatch, SetStateAction } from "react";

export function updateStateObject<O, K extends keyof O>(
  key: K,
  value: O[K],
  setState: Dispatch<SetStateAction<O>>,
) {
  setState((prev) => ({ ...prev, [key]: value }));
}
