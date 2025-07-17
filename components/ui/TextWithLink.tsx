import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, LinkProps } from "expo-router";
import { s } from "@/styles/common";
import { formatToArray } from "@/utils/formatToArray";

type TextWithLinkProps = {
  containerStyles?: any;
  text?: string;
  textStyles?: any;
  linkText?: string;
  linkStyles?: any;
  href?: LinkProps["href"];
  linkHasUnderline?: boolean;
  linkHasArrow?: boolean;
  fontSize?: number;
  variant?: "combined" | "separated";
};

export default function TextWithLink({
  containerStyles,
  text,
  textStyles,
  linkText,
  linkStyles,
  href,
  linkHasUnderline = true,
  linkHasArrow = false,
  fontSize = 16,
  variant = "combined",
}: TextWithLinkProps) {
  const link = (
    <Link href={href || "/"} disabled={href == null}>
      <Text
        style={[
          s.montserratFontRegular,
          styles.link,
          { fontSize: fontSize },
          linkHasUnderline ? styles.underline : styles.noUnderline,
          ...formatToArray(linkStyles),
        ]}
      >
        {linkText}
        {linkHasArrow && " >"} {/* Could be changed later */}
      </Text>
    </Link>
  );

  return (
    <View
      style={[
        styles.container,
        variant === "separated" && styles.separated,
        ...formatToArray(containerStyles),
      ]}
    >
      <Text
        style={[
          s.montserratFontRegular,
          { fontSize: fontSize },
          ...formatToArray(textStyles),
        ]}
      >
        {text}
        {variant === "combined" && linkText && link}
      </Text>
      {variant === "separated" && linkText && link}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  separated: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  link: {
    color: "red",
  },
  underline: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  noUnderline: {
    textDecorationLine: "none",
  },
});
