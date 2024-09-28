import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Button, Text, Title } from "@/src/shared/components/ui";
import { useMMKVBoolean } from "react-native-mmkv";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const Aware = () => {
  const [isUserAware, setIsUserAware] = useMMKVBoolean("isUserAware");
  const { t } = useTranslation("aware");
  const params = useLocalSearchParams();
  const router = useRouter();

  const { onAwareRedirect, type } = params;

  const nextRoute =
    onAwareRedirect === "random-card" ? "/random-card/" : "/scanner/";

  const onStartGame = () => {
    setIsUserAware(true);
    router.push(nextRoute);
  };

  useEffect(() => {
    if (isUserAware && type !== "error") {
      router.push("/");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Title>{t("Be aware!")}</Title>
      <Text style={styles.mb64}>
        {t(
          "The Music App app required an internet connection to stream music to your mobile device. Be sure to use a secure Wi-Fi connection to avoid addition charges from your provider."
        )}
      </Text>
      {type !== "error" && (
        <Button
          type="primary"
          title={t("I understand")}
          onPress={onStartGame}
        />
      )}
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
  mb64: {
    marginBottom: getResponsiveSize(64),
  },
});
