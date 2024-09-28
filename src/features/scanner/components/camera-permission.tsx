import { useCameraPermissions } from "expo-camera/next";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Title, Text, Button } from "@/src/shared/components/ui";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const CameraPermission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { t } = useTranslation("scanner");
  const router = useRouter();

  useEffect(() => {
    if (permission?.status === "granted") {
      router.replace("/scanner/");
    }
  }, [permission]);

  return (
    <View style={styles.container}>
      <Title>{t("Be aware!")}</Title>
      <Text style={styles.mb64}>
        {t(
          permission?.canAskAgain
            ? "The Music App app needs access to the camera to continue scanning QR codes from our game cards"
            : "The Music App app needs access to the camera to continue scanning QR codes from our game cards. To enable camera access, please adjust your settings"
        )}
      </Text>
      <Button
        type="primary"
        title={t(
          permission?.canAskAgain ? "Request permission" : "Open settings"
        )}
        onPress={() => {
          if (permission?.canAskAgain) requestPermission();
          else Linking.openSettings();
        }}
      />
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
