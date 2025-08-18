import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/Themes";

export const iconSize = { large: 30, medium: 27, regular: 24, small: 20 };

export const s = StyleSheet.create({
  // Spacing and Sizing.
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainScrollContainer: {
    width: "93.75%",
  },
  roundingAndPadding: {
    borderRadius: 20,
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
    paddingTop: 30,
  },

  // Fonts.
  montserratFontExtraBold: {
    fontFamily: "Montserrat-ExtraBold",
  },
  montserratFontBold: {
    fontFamily: "Montserrat-Bold",
  },
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
  montserratFontThin: {
    fontFamily: "Montserrat-Thin",
  },
});
