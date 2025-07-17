import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { s, iconSize } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { SvgProps } from "react-native-svg";
import { GradientText } from "@/components";
import { router, Route } from "expo-router";

type NavbarButtonProps = {
  imgNormal: React.FC<SvgProps>;
  imgSelected: React.FC<SvgProps>;
  title: string;
  URL: Route;
  isSelected?: boolean;
};

export default function NavbarButton({
  imgNormal: NormalIcon,
  imgSelected: GradientIcon,
  title,
  URL,
  isSelected = false,
}: NavbarButtonProps) {
  const Icon = isSelected ? GradientIcon : NormalIcon;
  let text;
  if (isSelected) {
    text = (
      <GradientText
        textStyles={[styles.text, s.montserratFontRegular]}
        colors={[Colors.primary, Colors.secondary]}
        text={title}
      />
    );
  } else {
    text = (
      <Text
        style={[styles.text, styles.notSelectedText, s.montserratFontRegular]}
      >
        {title}
      </Text>
    );
  }
  return (
    <Pressable
      disabled={isSelected}
      style={[styles.container]}
      onPress={() => router.push(URL)}
    >
      <Icon width={iconSize.large} height={iconSize.large} />
      {text}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
    zIndex: 999,
  },
  gradientTextBG: {
    backgroundClip: "content",
    clip: "content",
  },
  text: {
    fontSize: 14,
  },
  notSelectedText: {
    color: Colors.grey,
  },
});
