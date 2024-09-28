import { Image, StyleSheet, View } from "react-native";
import ImageLogo from "@/assets/images/logo.png";
import { getResponsiveSize } from "@/src/util/size";

export const Logo = () => (
  <View style={styles.container}>
    <Image source={ImageLogo} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logo: {
    width: getResponsiveSize(138),
    height: getResponsiveSize(62),
  },
});
