import { Slot } from "expo-router";
import { Logo } from "@/src/shared/components/logo";
import { ScreenContainer } from "@/src/shared/components";

export default function IntroCountryLayout() {
  return (
    <ScreenContainer>
      <Logo />
      <Slot />
    </ScreenContainer>
  );
}
