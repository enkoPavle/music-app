import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function RulesLayout() {
  return (
    <ScreenContainer>
      <Header type="back" hasLogo={false} />
      <Slot />
    </ScreenContainer>
  );
}
