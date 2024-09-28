import { ImageBackground, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageAppBackground from "@/assets/images/app-background.png";
import { getResponsiveSize } from "@/src/util/size";

interface Props extends ViewProps {
  paddingHorizontal?: number;
}

export const ScreenContainer: React.FC<Props> = ({
  style,
  paddingHorizontal = 50,
  ...restProps
}) => {
  return (
    <ImageBackground style={styles.flexContainer} source={imageAppBackground}>
      <SafeAreaView style={styles.flexContainer}>
        <View
          style={[
            styles.container,
            { paddingHorizontal: getResponsiveSize(paddingHorizontal) },
            style,
          ]}
          {...restProps}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flexContainer: { flex: 1 },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: getResponsiveSize(20),
  },
});
