import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function RulesLayout() {
  return (
    <ScreenContainer paddingHorizontal={25}>
      <Header type="backWithClose" hasLogo={false} />
      <Slot />
    </ScreenContainer>
  );
}
