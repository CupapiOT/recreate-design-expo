import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextField, VariableButton, TextWithLink } from "@/components";
import { Colors } from "@/constants/Themes";
import { s, iconSize } from "@/styles/common";
import { Feather } from "@expo/vector-icons";
import { DriversSGLogo } from "@/constants/CustomIcons";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <LinearGradient
      style={s.topContainer}
      colors={[Colors.secondary, Colors.primary]}
    >
      <SafeAreaView style={s.topContainer}>
        <View style={styles.imageContainer}>
          <DriversSGLogo width={260} height={60} />
        </View>
        <View style={styles.buttonsContainer}>
          <TextField
            placeholder="Mobile Number"
            startIcon={
              <Feather
                name="smartphone"
                size={iconSize.regular}
                color={Colors.black}
              />
            }
          />
          <TextField
            placeholder="Password"
            type="password"
            startIcon={
              <Feather
                name="key"
                size={iconSize.regular}
                color={Colors.black}
              />
            }
          />
          <VariableButton
            fontSize={18}
            title="LOGIN"
            onPress={() => router.push("/")}
          />
        </View>
        <TextWithLink
          containerStyles={styles.signUpContainer}
          text="Don't have an account? "
          textStyles={styles.signUpText}
          linkText="Sign Up"
          href="/register"
          fontSize={18}
        />
        <Text style={[s.montserratFontLight, styles.footer]}>
          www.drivers.sg
        </Text>
      </SafeAreaView>
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
