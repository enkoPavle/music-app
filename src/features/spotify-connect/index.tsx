import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Title } from "@/src/shared/components/ui";
import { useSpotify } from "@/src/shared/hooks/use-spotify";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const SpotifyConnect = () => {
  const { auth } = useSpotify();
  const { t } = useTranslation("spotifyConnect");

  return (
    <View style={styles.container}>
      <Title>{t("Connect with Spotify")}</Title>
      <Text style={styles.mb64}>
        {t("Start exploring now and let the melodies take you on a journey!")}
      </Text>
      <Button type="primary" title={t("CONNECT")} onPress={auth} />
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
    marginBottom: 16,
  },
  mb64: {
    marginBottom: getResponsiveSize(64),
  },
});
