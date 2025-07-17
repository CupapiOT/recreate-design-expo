import React from "react";
import { StyleSheet } from "react-native";
import { LinkProps } from "expo-router";
import { s } from "@/styles/common";
import { formatToArray } from "@/utils/formatToArray";
import TextWithLink from "./TextWithLink";
import { Colors } from "@/constants/Themes";

type SectionTitleProps = {
  containerStyles?: any;
  title?: string;
  textStyles?: any;
  linkStyles?: any;
  href: LinkProps["href"];
  linkHasUnderline?: boolean;
  fontSize?: number;
};

export default function SectionTitle({
  containerStyles,
  title,
  textStyles,
  linkStyles,
  href,
  linkHasUnderline = false,
  fontSize = 18,
}: SectionTitleProps) {
  return (
    <TextWithLink
      textStyles={[
        s.montserratFontSemiBold,
        styles.text,
        { fontSize: fontSize },
        ...formatToArray(textStyles),
      ]}
      linkStyles={[
        s.montserratFontRegular,
        styles.text,
        { fontSize: fontSize - 2 },
        ...formatToArray(linkStyles),
      ]}
      containerStyles={[styles.container, ...formatToArray(containerStyles)]}
      text={title}
      linkText="View all"
      variant="separated"
      linkHasUnderline={linkHasUnderline}
      {...(href && { href: href })}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  text: {
    color: Colors.primary,
  },
  underline: {
    textDecorationLine: "underline",
  },
  noUnderline: {
    textDecorationLine: "none",
  },
});
