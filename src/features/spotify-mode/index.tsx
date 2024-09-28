import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Text, Title } from "@/src/shared/components/ui";
import { usePreviousRoute, useSpotify } from "@/src/shared/hooks";
import { getResponsiveSize } from "@/src/util/size";

export const SpotifyMode = () => {
  const { previousRouteName } = usePreviousRoute();
  const { t } = useTranslation("spotifyMode");
  const { dismissAuth } = useSpotify();

  const router = useRouter();

  const onUseFree = () => {
    dismissAuth();
    if (previousRouteName === "settings") router.push("/settings/");
    else {
      router.dismissAll();
      router.replace("/");
    }
  };

  const onLoginSpotifyPremium = () => {
    router.push("/spotify-connect/");
  };

  return (
    <View style={styles.container}>
      <Title>{t("Spotify Premium?")}</Title>
      <Text style={styles.mb64}>
        {t("Do you have Spotify Premium account?")}
      </Text>
      <Button type="primary" title={t("NO")} onPress={onUseFree} />
      <Text style={styles.mb16}>{t("or")}</Text>
      <Button
        type="secondary"
        title={t("LOGIN SPOTIFY PREMIUM")}
        onPress={onLoginSpotifyPremium}
      />
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
  mb16: {
    marginBottom: getResponsiveSize(16),
  },
  mb64: {
    marginBottom: getResponsiveSize(64),
  },
});
