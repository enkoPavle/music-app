import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function SpotifyConnectLayout() {
  return (
    <ScreenContainer>
      <Header type="backWithSettings" />
      <Slot />
    </ScreenContainer>
  );
}
