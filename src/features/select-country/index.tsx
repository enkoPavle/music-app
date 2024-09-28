import { StyleSheet, View } from "react-native";
import { useIntroContext } from "@/src/context";
import {
  Button,
  CountrySelector,
  Text,
  Title,
} from "@/src/shared/components/ui";
import { useTranslation } from "react-i18next";
import { getResponsiveSize } from "@/src/util/size";

export const SelectCountry = () => {
  const { onNextIntroStep } = useIntroContext();
  const { t } = useTranslation("selectCountry");

  return (
    <View style={styles.container}>
      <Title>{t("Hi there")}</Title>
      <Text style={styles.mb60}>
        {t(
          "Discover your favorite tunes, create playlists, and immerse yourself in the world of music"
        )}
      </Text>
      <CountrySelector />
      <Button type="primary" title={t("SELECT")} onPress={onNextIntroStep} />
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

  mb60: {
    marginBottom: getResponsiveSize(60),
  },
});
