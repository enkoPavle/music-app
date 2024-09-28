import React from "react";
import * as SVGIcons from "@/src/constants/icons";
import { SVGIconNames } from "@/src/types/icons";
import { StyleProp, ViewStyle } from "react-native";

interface IProps {
  name: SVGIconNames;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

export const SVGIcon: React.FC<IProps> = ({ name, style, width, height }) => {
  const IconComponent = SVGIcons[name].default;

  return <IconComponent width={width} height={height} style={style} />;
};
