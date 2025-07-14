import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";

type VariableButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "red" | "gradient" | "blue";
  width?: number;
};

export default function VariableButton({
  title,
  onPress = () => {},
  variant = "red",
  width = 375,
}: VariableButtonProps) {
  let buttonContent;
  let backgroundColor = "transparent";
  const textArea = (
    <Text style={[styles.buttonText, s.montserratFontRegular]}>{title}</Text>
  );

  switch (variant) {
    case "red":
      backgroundColor = Colors.secondary;
      buttonContent = textArea;
      break;
    case "blue":
      buttonContent = textArea;
      backgroundColor = Colors.primary;
      break;
    case "gradient":
      buttonContent = (
        <LinearGradient
          style={[s.roundingAndPadding, styles.button, { width: width }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.primary, Colors.secondary]}
        >
          {textArea}
        </LinearGradient>
      );
      break;
  }
  return (
    <Pressable
      style={[
        styles.button,
        s.roundingAndPadding,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      {buttonContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});
