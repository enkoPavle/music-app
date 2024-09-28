import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text, Title } from "@/src/shared/components/ui";
import { useMMKVBoolean } from "react-native-mmkv";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const Home = () => {
  const [isUserAware] = useMMKVBoolean("isUserAware");
  const { t } = useTranslation("home");
  const router = useRouter();

  const onStartGame = () => {
    const route = isUserAware ? "/scanner/" : "/aware/";
    router.push(route);
  };

  const onRandomCard = () => {
    const route = isUserAware ? "/random-card/" : "/aware/";
    router.push(route);
  };

  const onReadRules = () => {
    router.push("/rules/");
  };

  return (
    <View style={styles.container}>
      <Title>{t("Let’s Play")}</Title>
      <Text style={styles.mb64}>
        {t("Start exploring now and let the melodies take you on a journey!")}
      </Text>
      <Button
        style={styles.startButton}
        type="primary"
        title={t("START A GAME")}
        onPress={onStartGame}
      />
      <Button
        style={styles.mb16}
        type="primary"
        title={t("RANDOM CARD")}
        onPress={onRandomCard}
      />
      <Text style={styles.mb16}>{t("or")}</Text>
      <Button type="secondary" title={t("READ RULES")} onPress={onReadRules} />
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
