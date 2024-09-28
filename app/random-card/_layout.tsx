import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function RandomCardLayout() {
  return (
    <ScreenContainer>
      <Header type="back" hasLogo={true} />
      <Slot />
    </ScreenContainer>
  );
}
