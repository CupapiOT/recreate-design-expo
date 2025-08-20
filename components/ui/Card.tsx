import { formatToArray } from "@/utils/formatToArray";
import React, { ReactNode } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

type CardProps = {
  style?: ViewStyle | ViewStyle[];
  children?: ReactNode;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  backgroundColor?: string;
  variant?: "view" | "pressable";
  onPress?: () => void;
};

export default function Card({
  style,
  children,
  padding = 12,
  paddingHorizontal = padding,
  paddingVertical = padding,
  borderRadius = 20,
  backgroundColor = Colors.white,
  variant = "view",
  onPress,
  ...props
}: CardProps) {
  return variant === "view" ? (
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
  ) : (
    <Pressable
      onPress={onPress ?? (() => {})}
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
    </Pressable>
  );
}
