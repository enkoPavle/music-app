import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { ImageBackground } from "react-native";
import { IntroProvider, PlayerProvider } from "@/src/context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useI18n } from "@/src/shared/hooks";
import imageAppBackground from "@/assets/images/app-background.png";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "home",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isInitialized, initI18n } = useI18n();

  const onInit = async () => {
    await initI18n();

    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  };

  useEffect(() => {
    onInit();
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <RootLayoutNav />
    </>
  );
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <IntroProvider>
        <PlayerProvider>
          <ImageBackground
            style={{ flex: 1, backgroundColor: "#2f3339" }}
            source={imageAppBackground}
          >
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: "transparent" },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="aware" options={{ headerShown: false }} />
              <Stack.Screen name="rules" options={{ headerShown: false }} />
              <Stack.Screen
                name="random-card"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="scanner" options={{ headerShown: false }} />
              <Stack.Screen name="player" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen
                name="(intro)/select-country"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(intro)/select-language"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="spotify-mode"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="spotify-connect"
                options={{ headerShown: false }}
              />
            </Stack>
          </ImageBackground>
        </PlayerProvider>
      </IntroProvider>
    </SafeAreaProvider>
  );
}
