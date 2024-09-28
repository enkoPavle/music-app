import { StyleSheet, View } from "react-native";
import React from "react";
import { RulesList } from "./components/rules-list";
import { Title } from "@/src/shared/components/ui";
import { useTranslation } from "react-i18next";

export const Rules = () => {
  const { t } = useTranslation("rules");

  return (
    <View style={styles.container}>
      <Title>{t("Rules")}</Title>
      <RulesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
