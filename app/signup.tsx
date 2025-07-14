import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextField, VariableButton, TextWithLink } from "@/components";
import { Checkbox } from "expo-checkbox";
import { iconSize, s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.topContainer}>
      <Text style={s.subtitle}>Sign Up New Account</Text>
      <View style={styles.inputsContainer}>
        <TextField
          startIcon={<Feather name="user" size={iconSize.feather} />}
          placeholder="User Name"
          hollow={true}
        />
        <TextField
          startIcon={<Feather name="smartphone" size={iconSize.feather} />}
          placeholder="Mobile Number"
          hollow={true}
        />
        <TextField
          startIcon={<Feather name="key" size={iconSize.feather} />}
          placeholder="Password"
          type="password"
          hollow={true}
        />
      </View>
      <VariableButton title="SIGN UP" onPress={() =>{router.push("/login")}} variant="gradient" />
      <View style={styles.termsContainer}>
        <Checkbox
          value={isChecked}
          color={isChecked ? Colors.primary : undefined}
          onValueChange={setChecked}
        />
        <View>
          <TextWithLink
            text="I read and agreed on drivers.sg "
            textStyles={styles.termsText}
            link="Terms & Conditions"
            linkStyles={s.montserratFontMedium}
            href="https://www.privacypolicyonline.com/sample-terms-conditions-template/"
            fontSize={18}
          />
        </View>
      </View>
      <TextWithLink
        containerStyles={styles.signUpContainer}
        text="Already have an account? "
        textStyles={styles.termsText}
        link="Login"
        linkStyles={s.montserratFontMedium}
        href="/login"
        linkHasUnderline={false}
        fontSize={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    gap: 30,
    backgroundColor: Colors.white,
  },
  inputsContainer: {
    justifyContent: "center",
    width: 375,
    rowGap: 20,
  },
  termsContainer: {
    width: 375,
    flexDirection: "row",
    columnGap: 15,
  },
  termsText: {
    width: 375,
    fontSize: 16,
    color: Colors.black,
  },
  termsLink: {
    fontSize: 16,
    color: Colors.secondary,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  signUpContainer: {
    position: "absolute",
    left: 77,
    bottom: 100,
    alignSelf: "center",
    flexDirection: "row",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
  },
});
