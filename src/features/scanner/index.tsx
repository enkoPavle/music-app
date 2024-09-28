import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/next";
import { Platform, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Camera, CameraPermission } from "./components";
import { Title } from "@/src/shared/components/ui";
import { useSpotify } from "@/src/shared/hooks";
import { useTranslation } from "react-i18next";

export const Scanner = () => {
  const [hasResult, setHasResult] = useState(false);
  const [permission] = useCameraPermissions();
  const { t } = useTranslation("scanner");
  const { openLinkIos, openLinkAndroid } = useSpotify();

  const onBarcodeScanned = async (result: BarcodeScanningResult) => {
    if (hasResult) return;

    setHasResult(true);
    if (Platform.OS === "ios") {
      openLinkIos(result.data);
    } else {
      openLinkAndroid(result.data);
    }
  };

  if (!permission)
    return (
      <View style={styles.container}>
        <Title>{t("Loading")}</Title>
      </View>
    );

  if (!permission.granted) return <CameraPermission />;

  return <Camera onBarcodeScanned={onBarcodeScanned} />;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
