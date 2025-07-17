import React from "react";
import { StyleSheet, Text, TextProps, ColorValue } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { formatToArray } from "@/utils/formatToArray";
import { Colors } from "@/constants/Themes";

type GradientTextProps = {
  text: string;
  textStyles?: TextProps["style"];
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

export default function GradientText({
  text,
  textStyles,
  colors = [Colors.primary, Colors.secondary],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}: GradientTextProps) {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.maskText, ...formatToArray(textStyles)]}>
          {text}
        </Text>
      }
    >
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={[styles.gradientText, ...formatToArray(textStyles)]}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  maskText: {
    backgroundColor: "transparent",
    color: "black",
  },
  gradientText: {
    backgroundColor: "transparent",
    opacity: 0,
  },
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
