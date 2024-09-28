import { useFocusEffect, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Title } from "@/src/shared/components/ui";
import { usePreventOfflineAction } from "@/src/shared/hooks";
import { useTranslation } from "react-i18next";
import { API_URL, API_URL_KEY } from "@/src/enviroments";
import { getResponsiveSize } from "@/src/util/size";

export const RandomCard = () => {
  const [randomCard, setRandomCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const preventOfflineAction = usePreventOfflineAction("/random-card/");
  const { t } = useTranslation("randomCard");
  const router = useRouter();

  const getRandomCard = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        API_URL + "/api/internal/card-number/random",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_URL_KEY}`,
          },
        }
      );

      const data = await response.json();
      const cardNumber = data.cardNumber;

      if (cardNumber) setRandomCard(cardNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(() => {
    if (!randomCard && !isLoading) {
      preventOfflineAction(getRandomCard);
    }
  });

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{t("Your card number is")}</Title>
      <Title style={styles.cardNumber}>{randomCard ?? "..."}</Title>
      <Button
        type="primary"
        title={t("Scan QR code")}
        onPress={() => router.push("/scanner/")}
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
  title: {
    fontSize: getResponsiveSize(42),
  },
  cardNumber: {
    fontSize: getResponsiveSize(100),
    marginBottom: getResponsiveSize(64),
  },
});
