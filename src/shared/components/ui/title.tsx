import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { getResponsiveSize } from "@/src/util/size";
import { useIntroContext } from "@/src/context";

interface Props {
  style?: TextStyle;
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ style, children }) => {
  const { language } = useIntroContext();
  const fontSize = getResponsiveSize(language === "en" ? 50 : 42);

  return <Text style={[styles.title, { fontSize }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Baloo2-Regular",
    fontWeight: "700",
    textAlign: "center",
    color: "#ffffff",
  },
});
