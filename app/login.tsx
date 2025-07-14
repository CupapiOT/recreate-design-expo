import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextField, VariableButton, TextWithLink } from "@/components";
import { Colors } from "@/constants/Themes";
import { s, iconSize } from "@/styles/common";
import { Feather } from "@expo/vector-icons";
import DriversSG from "@/assets/images/icons/driverssg";

export default function LoginScreen() {
  return (
    <LinearGradient
      style={styles.topContainer}
      colors={[Colors.secondary, Colors.primary]}
    >
      <View style={styles.imageContainer}>
        <DriversSG />
      </View>
      <View style={styles.buttonsContainer}>
        <TextField
          placeholder="Mobile Number"
          startIcon={
            <Feather
              name="smartphone"
              size={iconSize.feather}
              color={Colors.black}
            />
          }
        />
        <TextField
          placeholder="Password"
          type="password"
          startIcon={
            <Feather name="key" size={iconSize.feather} color={Colors.black} />
          }
        />
        <VariableButton title="LOGIN" />
      </View>
      <TextWithLink
        containerStyles={styles.signUpContainer}
        text="Don't have an account? "
        textStyles={styles.signUpText}
        link="Sign Up"
        href="/signup"
        fontSize={18}
      />
      <Text style={[s.montserratFontLight, styles.footer]}>www.drivers.sg</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 7,
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 4,
    justifyContent: "center",
    width: 375,
    rowGap: 20,
  },
  signUpContainer: {
    flex: 2,
    position: "relative",
    top: -60,
  },
  signUpText: {
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    color: "#eeeeee",
    fontSize: 12,
  },
});
