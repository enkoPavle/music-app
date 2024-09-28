import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useIntroContext } from "@/src/context";
import { Text } from "./ui/text";
import { useTranslation } from "react-i18next";
import { countries } from "@/src/util/countries";
import { getResponsiveSize } from "@/src/util/size";
import iconSelectorArrows from "@/assets/icons/selector-arrows.png";

const ItemSeparatorComponent = () => (
  <View
    style={{
      height: getResponsiveSize(1),
      backgroundColor: "#000",
      opacity: 0.1,
    }}
  />
);

export const CountrySelector = () => {
  const { country, setUserCountry } = useIntroContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation("selectCountry");

  return (
    <View>
      <Text style={styles.title}>{t("Please select your country:")}</Text>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>{country ?? t("Select a country")}</Text>
        <Image source={iconSelectorArrows} style={styles.icon} />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{t("Select a Country")}:</Text>
            <FlatList
              data={countries}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setUserCountry(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={ItemSeparatorComponent}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: getResponsiveSize(10),
    paddingHorizontal: getResponsiveSize(16),
    borderColor: "#ffffff",
    borderRadius: getResponsiveSize(8),
    borderWidth: getResponsiveSize(1),
    width: "100%",
    backgroundColor: "#ffffff0D",
    marginBottom: getResponsiveSize(16),
  },
  title: {
    marginBottom: getResponsiveSize(16),
  },
  text: {
    fontSize: getResponsiveSize(14),
  },
  icon: {
    width: getResponsiveSize(16),
    height: getResponsiveSize(16),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: getResponsiveSize(100),
    paddingHorizontal: getResponsiveSize(50),
  },
  modalView: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: getResponsiveSize(16),
    paddingVertical: getResponsiveSize(16),
  },
  modalTitle: {
    color: "#000000",
    fontWeight: "700",
    fontSize: getResponsiveSize(20),
    marginBottom: getResponsiveSize(16),
  },
  modalText: {
    color: "#000000",
    paddingVertical: getResponsiveSize(8),
    textAlign: "center",
  },
});
