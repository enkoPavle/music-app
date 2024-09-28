import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useIntroContext } from "@/src/context";
import { Text } from "./ui";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";
import imageDE from "@/assets/images/de.png";
import imageEN from "@/assets/images/en.png";

export const LanguageSelector = () => {
  const { language, setUserLanguage } = useIntroContext();
  const { t } = useTranslation("selectLanguage");

  return (
    <View>
      <Text style={styles.title}>{t("Please select language:")}</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, language === "de" && styles.selected]}
          onPress={() => setUserLanguage("de")}
        >
          <Image source={imageDE} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === "en" && styles.selected]}
          onPress={() => setUserLanguage("en")}
        >
          <Image source={imageEN} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: getResponsiveSize(32),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: getResponsiveSize(32),
  },
  title: {
    marginBottom: getResponsiveSize(16),
  },
  image: {
    width: getResponsiveSize(80),
    height: getResponsiveSize(80),
  },
  button: {
    padding: getResponsiveSize(11),
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "transparent",
  },
  selected: {
    borderColor: "#ffffff",
  },
});
