import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function SettingsLayout() {
  return (
    <ScreenContainer>
      <Header type="backWithClose" hasLogo={false} />
      <Slot />
    </ScreenContainer>
  );
}
