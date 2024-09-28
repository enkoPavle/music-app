import { useRouter } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import {
  Button,
  CountrySelector,
  Text,
  Title,
} from "@/src/shared/components/ui";
import { LanguageSelector } from "@/src/shared/components";
import { useSpotify } from "@/src/shared/hooks";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const Settings = () => {
  const { t } = useTranslation("settings");
  const { isAuth } = useSpotify();
  const router = useRouter();

  const onChangeSpotifyMode = () => {
    router.push("/spotify-mode/");
  };

  return (
    <View style={styles.container}>
      <Title>{t("Settings")}</Title>
      {Platform.OS === "android" && (
        <>
          <Text style={styles.mb16}>
            {t("The Music App app is currently set to Spotify", {
              mode: t(isAuth ? "Premium" : "Free"),
            })}
          </Text>
          <Button
            type="secondary"
            title={t("Change Spotify Mode")}
            onPress={onChangeSpotifyMode}
          />
        </>
      )}
      <LanguageSelector />
      <CountrySelector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    paddingVertical: getResponsiveSize(30),
  },
  mb16: {
    marginBottom: getResponsiveSize(16),
  },
  mb64: {
    marginBottom: getResponsiveSize(64),
  },
});
