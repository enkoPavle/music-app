import { BaseText } from "./base-text";
import { StrongText } from "./strong-text";
import { Br, Br2 } from "./br";

export const Text = Object.assign(BaseText, {
  Strong: StrongText,
  Br,
  Br2,
});
