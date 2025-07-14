import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/Themes";

export const iconSize = {fontAwesome: 30, feather: 24};

export const s = StyleSheet.create({
  // Spacing and Sizing.
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roundingAndPadding: {
    borderRadius: 20,
    height: 55,
    paddingInline: 15,
    columnGap: 10,
    alignItems: "center",
  },

  // Headers.
  subtitle: {
    fontFamily: Platform.select({
      android: "Montserrat-SemiBold",
      ios: "Montserrat-SemiBold",
    }),
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 10,
  },

  // Fonts.
  montserratFontSemiBold: {
    fontFamily: "Montserrat-SemiBold",
  },
  montserratFontMedium: {
    fontFamily: "Montserrat-Medium",
  },
  montserratFontRegular: {
    fontFamily: "Montserrat-Regular",
  },
  montserratFontLight: {
    fontFamily: "Montserrat-Light",
  },
});
