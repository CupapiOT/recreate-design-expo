import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  GestureResponderEvent,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { iconSize, s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { formatToArray } from "@/utils/formatToArray";
import { FontAwesome6 } from "@expo/vector-icons";

type VariableButtonProps = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?:
    | "red"
    | "gradient"
    | "small"
    | "withArrow"
    | "withBackArrow"
    | "action";
  width?: number | string;
  height?: number;
  image?: React.ReactNode;
  style?: any;
  textStyle?: TextStyle | TextStyle[];
  arrowPosition?: "inline" | "otherSide";
  borderStyle?: any;
  fontSize?: number;
};

export default function VariableButton({
  title = "",
  onPress = () => {},
  variant = "red",
  width,
  height,
  image,
  style,
  textStyle,
  arrowPosition = "inline",
  borderStyle,
  fontSize,
}: VariableButtonProps) {
  let buttonContent;
  let backgroundColor = "transparent";
  const textArea = (
    <>
      {variant === "withBackArrow" && (
        <FontAwesome6
          {...(arrowPosition === "otherSide" && {
            style: { position: "absolute", left: "15%" },
          })}
          name="arrow-left"
          size={iconSize.small}
          color={Colors.white}
        />
      )}
      {image && image}
      {title && (
        <Text
          style={[
            styles.buttonText,
            s.montserratFontRegular,
            { fontSize: fontSize },
            // So the text is visible on the white background.
            ...(variant === "action" ? [{ color: Colors.primary }] : []),
            ...formatToArray(textStyle),
          ]}
        >
          {title}
        </Text>
      )}
      {variant === "withArrow" && (
        <FontAwesome6
          {...(arrowPosition === "otherSide" && {
            style: { position: "absolute", right: "15%" },
          })}
          name="arrow-right"
          size={iconSize.small}
          color={Colors.white}
        />
      )}
    </>
  );

  switch (variant) {
    case "red":
      width = width || 375;
      height = height || 55;
      backgroundColor = Colors.secondary;
      buttonContent = textArea;
      break;
    case "small":
      width = width || 158;
      height = height || 29;
      backgroundColor = Colors.primary;
      buttonContent = textArea;
      break;
    case "withBackArrow":
    case "withArrow":
      height = height || 40;
      backgroundColor = Colors.primary;
      buttonContent = textArea;
      break;
    case "action":
      width = width || 48;
      height = height || 40;
      backgroundColor = Colors.white;
      buttonContent = textArea;
      break;
    case "gradient":
      width = width || 375;
      height = height || 55;
      buttonContent = (
        <LinearGradient
          style={[
            s.roundingAndPadding,
            styles.button,
            { width: width, height: height },
            ...formatToArray(borderStyle),
          ]}
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
        { backgroundColor: backgroundColor, width: width, height: height },
        // The gradient variant needs to take border styling, not the button itself.
        ...(variant !== "gradient" ? formatToArray(borderStyle) : []),
        ...(variant !== "action"
          ? [s.roundingAndPadding]
          : [styles.actionButton]),
        ...(variant === "withArrow" ? [{ borderRadius: 9999 }] : []),
        ...formatToArray(style),
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
    flexDirection: "row",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
  actionButton: {
    borderRadius: 15,
  },
});
