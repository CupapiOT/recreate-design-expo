import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { TextField, VariableButton, TextWithLink } from "@/components";
import { Checkbox } from "expo-checkbox";
import { iconSize, s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={[s.topContainer, styles.topContainer]}>
      <Text style={s.subtitle}>Sign Up New Account</Text>
      <View style={styles.inputsContainer}>
        <TextField
          startIcon={<Feather name="user" size={iconSize.regular} />}
          placeholder="User Name"
          hollow={true}
        />
        <TextField
          startIcon={<Feather name="smartphone" size={iconSize.regular} />}
          placeholder="Mobile Number"
          hollow={true}
        />
        <TextField
          startIcon={<Feather name="key" size={iconSize.regular} />}
          placeholder="Password"
          type="password"
          hollow={true}
        />
      </View>
      <View style={styles.termsContainer}>
        <Checkbox
          value={isChecked}
          color={isChecked ? Colors.primary : undefined}
          onValueChange={setChecked}
        />
        <View>
          <TextWithLink
            text="I read and agreed on drivers.sg "
            textStyles={styles.termsAndSignUpText}
            linkText="Terms & Conditions"
            linkStyles={s.montserratFontMedium}
            href="https://www.privacypolicyonline.com/sample-terms-conditions-template/"
            fontSize={16}
          />
        </View>
      </View>
      <VariableButton
        title="SIGN UP"
        onPress={() => {
          router.push("/login");
        }}
        variant="gradient"
        fontSize={18}
      />
      <TextWithLink
        containerStyles={styles.signUpContainer}
        text="Already have an account? "
        textStyles={[styles.termsAndSignUpText, s.montserratFontRegular]}
        linkText="Login"
        linkStyles={[s.montserratFontSemiBold]}
        href="/login"
        linkHasUnderline={false}
        fontSize={16}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
    paddingTop: 30,
    gap: 30,
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
  termsAndSignUpText: {
    width: 375,
    fontSize: 16,
    color: Colors.black,
  },
  termsLink: {
    fontSize: 16,
  },
  signUpContainer: {
    position: "absolute",
    bottom: 100,
    marginLeft: 120,
    flexDirection: "row",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
  },
});
