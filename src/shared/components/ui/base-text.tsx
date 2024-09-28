import React from "react";
import { StyleSheet, Text, View, TextStyle } from "react-native";
import { getResponsiveSize } from "@/src/util/size";

interface Props {
  style?: TextStyle;
  children: React.ReactNode;
}

export const BaseText: React.FC<Props> = ({ style, children }) => (
  <View>
    <Text style={[styles.title, style]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: "Baloo2-Regular",
    textAlign: "center",
    fontSize: getResponsiveSize(16),
    fontWeight: "400",
    color: "#ffffff",
  },
});
