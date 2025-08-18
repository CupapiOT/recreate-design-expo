import { formatToArray } from "@/utils/formatToArray";
import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

type CardProps = {
  style?: ViewStyle | ViewStyle[];
  children?: ReactNode;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  backgroundColor?: string;
};

export default function Card({
  style,
  children,
  padding = 12,
  paddingHorizontal = padding,
  paddingVertical = padding,
  borderRadius = 20,
  backgroundColor = Colors.white,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        {
          padding,
          paddingHorizontal,
          paddingVertical,
          borderRadius,
          backgroundColor,
        },
        ...formatToArray(style),
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
