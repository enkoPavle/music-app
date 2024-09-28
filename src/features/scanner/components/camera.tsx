import { AntDesign } from "@expo/vector-icons";
import { BarcodeScanningResult, CameraView } from "expo-camera/next";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { getResponsiveSize } from "@/src/util/size";

interface Props {
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
}

export const Camera: React.FC<Props> = ({ onBarcodeScanned }) => {
  const { width } = useWindowDimensions();
  const scannerSize = Math.min(width * 0.5, 400);

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
          interval: 500,
        }}
        onBarcodeScanned={onBarcodeScanned}
        mode="picture"
        mute={true}
      />
      <View style={styles.borderContainer}>
        <View
          style={[
            styles.scannerContainer,
            { width: scannerSize, aspectRatio: 1 },
          ]}
        >
          <View style={styles.topLeft} />
          <View style={styles.topRight} />
          <View style={styles.bottomLeft} />
          <View style={styles.bottomRight} />
          <AntDesign
            name="playcircleo"
            size={getResponsiveSize(72)}
            color="#ffffff"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
    marginHorizontal: getResponsiveSize(-25),
    marginVertical: getResponsiveSize(80),
  },
  camera: {
    flex: 1,
  },
  borderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scannerContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  topLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderWidth: getResponsiveSize(5),
    borderLeftColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderWidth: getResponsiveSize(5),
    borderLeftColor: "transparent",
    borderTopColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderBottomColor: "transparent",
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderWidth: getResponsiveSize(5),
    borderLeftColor: "#ffffff",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ffffff",
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderWidth: getResponsiveSize(5),
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
    borderRightColor: "#ffffff",
    borderBottomColor: "#ffffff",
  },
});
