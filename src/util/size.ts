import { Dimensions } from "react-native";

const DESIGN_WIDTH = 428;

const { width } = Dimensions.get("window");
const scale = Math.min(Math.max(width / DESIGN_WIDTH, 0.7), 1);

export const getResponsiveSize = (size: number) => {
  return size * scale;
};
