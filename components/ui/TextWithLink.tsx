import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Link, LinkProps } from "expo-router";
import { s } from "@/styles/common";

type TextWithLinkProps = {
  containerStyles?: any;
  text?: string;
  textStyles?: any;
  link?: string;
  linkStyles?: any;
  href: LinkProps["href"];
  linkHasUnderline?: boolean;
  fontSize?: number;
};

export default function TextWithLink({
  containerStyles,
  text,
  textStyles,
  link,
  linkStyles,
  href,
  linkHasUnderline = true,
  fontSize = 16,
}: TextWithLinkProps) {
  return (
    <View
      style={[
        styles.container,
        ...(Array.isArray(containerStyles)
          ? containerStyles
          : [containerStyles]),
      ]}
    >
      <Text
        style={[
          s.montserratFontRegular,
          { fontSize: fontSize },
          ...(Array.isArray(textStyles) ? textStyles : [textStyles]),
        ]}
      >
        {text}
        <Link href={href}>
          <Text
            style={[
              s.montserratFontRegular,
              styles.link,
              { fontSize: fontSize },
              linkHasUnderline ? styles.underline : styles.noUnderline,
              ...(Array.isArray(linkStyles) ? linkStyles : [linkStyles]),
            ]}
          >
            {link}
          </Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
