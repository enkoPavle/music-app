import { Stack } from "expo-router";
import { Home } from "@/src/features/home";
import { Header, ScreenContainer } from "@/src/shared/components";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Header type={"backWithSettings"} />
      <Home />
    </ScreenContainer>
  );
}
