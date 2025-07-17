import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import { s, iconSize } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenHeaderProps = {
  title: string;
  img: React.FC<SvgProps>;
};

export default function ScreenHeader({ title = "", img }: ScreenHeaderProps) {
  const ScreenIcon = img;
  return (
    <SafeAreaView style={styles.container}>
      <ScreenIcon width={iconSize.large} height={iconSize.large} />
      <Text style={[styles.title, s.montserratFontSemiBold]}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "90%",
    paddingTop: 8,
    zIndex: 998,
    columnGap: 8
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
  },
});
