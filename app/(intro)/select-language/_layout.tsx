import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function IntroLanguageLayout() {
  return (
    <ScreenContainer>
      <Header type={"back"} />
      <Slot />
    </ScreenContainer>
  );
}
