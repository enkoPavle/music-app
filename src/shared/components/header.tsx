import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, SVGIcon } from "./ui";
import { Logo } from "./logo";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

interface Props {
  type: "back" | "backWithClose" | "backWithSettings";
  hasLogo?: boolean;
  hideBackButton?: boolean;
}

export const Header: React.FC<Props> = ({
  type,
  hasLogo = true,
  hideBackButton = false,
}) => {
  const { t } = useTranslation("header");
  const router = useRouter();
  const canGoBack = router.canGoBack();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {hasLogo && <Logo />}
        <View style={styles.navigation}>
          {canGoBack && !hideBackButton ? (
            <TouchableOpacity
              style={styles.backButton}
              hitSlop={25}
              onPress={() => router.back()}
            >
              <SVGIcon
                name="ArrowBack"
                width={15}
                height={12}
                style={styles.iconBack}
              />
              <Text>{t("Back")}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {type === "backWithClose" && (
            <TouchableOpacity
              hitSlop={25}
              onPress={() => {
                router.dismissAll();
                router.replace("/");
              }}
            >
              <SVGIcon width={20} height={20} name="Close" />
            </TouchableOpacity>
          )}
          {type === "backWithSettings" && (
            <TouchableOpacity
              hitSlop={25}
              onPress={() => router.push("/settings/")}
            >
              <SVGIcon width={20} height={20} name="Settings" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: getResponsiveSize(12),
    zIndex: 1,
  },
  wrapper: {
    position: "relative",
  },
  navigation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getResponsiveSize(25),
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBack: {
    marginRight: getResponsiveSize(9),
  },
});
