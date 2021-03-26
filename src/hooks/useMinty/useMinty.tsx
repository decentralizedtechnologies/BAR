import { Minty } from "./minty";

export const useMinty = (): Minty => {
  const minty = new Minty();
  return minty.init();
};
