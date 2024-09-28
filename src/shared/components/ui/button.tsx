import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Text } from "./text";
import { getResponsiveSize } from "@/src/util/size";

interface Props {
  style?: TouchableOpacityProps["style"];
  type: "primary" | "secondary";
  title: string;
  onPress: TouchableOpacityProps["onPress"];
}

export const Button: React.FC<Props> = ({ style, type, title, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "primary" ? styles.primary : styles.secondary,
        style,
      ]}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: getResponsiveSize(8),
    paddingHorizontal: getResponsiveSize(16),
    borderRadius: getResponsiveSize(8),
    marginBottom: getResponsiveSize(16),
  },
  primary: {
    backgroundColor: "#EC365B",
  },
  secondary: {
    backgroundColor: "#ffffff0D",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  text: {
    fontSize: getResponsiveSize(18),
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
