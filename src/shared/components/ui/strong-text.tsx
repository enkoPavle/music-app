import React from "react";
import { StyleSheet, Text as BaseText, TextStyle } from "react-native";
import { getResponsiveSize } from "@/src/util/size";

interface Props {
  style?: TextStyle;
  children: React.ReactNode;
}

export const StrongText: React.FC<Props> = ({ style, children }) => (
  <BaseText style={[styles.title, style]}>{children}</BaseText>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: "Baloo2-Regular",
    fontSize: getResponsiveSize(16),
    fontWeight: "700",
    color: "#ffffff",
  },
});
