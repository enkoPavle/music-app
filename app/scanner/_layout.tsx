import { Slot } from "expo-router";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function ScannerLayout() {
  return (
    <ScreenContainer>
      <Header type="back" hasLogo={true} hideBackButton={true} />
      <Slot />
    </ScreenContainer>
  );
}
