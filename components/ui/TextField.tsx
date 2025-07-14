import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { iconSize, s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { FontAwesome } from "@expo/vector-icons";

export type TextFieldProps = {
  placeholder?: string;
  hollow?: boolean;
  style?: any;
  inputStyle?: any;
  type?: "text" | "number" | "email" | "password" | "tel";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange?: (text: string) => void;
  value?: string;
  disabled?: boolean;
  maxLength?: number;
};

export default function TextField({
  style,
  placeholder,
  hollow,
  type = "text",
  startIcon,
  inputStyle,
  endIcon,
  onChange,
  value,
  disabled,
  maxLength,
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View
      style={[
        hollow ? styles.hollow : styles.nonHollow,
        s.roundingAndPadding,
        ...(Array.isArray(style) ? style : [style]),
      ]}
    >
      <View style={[styles.inputContainer]}>
        {startIcon && <View style={styles.iconContainer}>{startIcon}</View>}
        <TextInput
          secureTextEntry={type === "password" && !isPasswordVisible}
          style={[
            styles.buttonText,
            s.montserratFontRegular,
            { width: type === "password" ? 275 : 300 },
            ...(Array.isArray(inputStyle) ? inputStyle : [inputStyle]),
          ]}
          placeholder={placeholder}
          keyboardType={
            type === "number"
              ? "numeric"
              : type === "tel"
                ? "phone-pad"
                : "default"
          }
          onChangeText={onChange}
          value={value}
          editable={!disabled}
          maxLength={maxLength}
        />
        {endIcon && <View style={styles.iconContainer}>{endIcon}</View>}
        {type === "password" && (
          <Pressable
            style={[styles.passwordIcon]}
            onPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
            {isPasswordVisible ? (
              <FontAwesome
                name="eye"
                size={iconSize.fontAwesome}
                color={Colors.grey}
              />
            ) : (
              <FontAwesome
                name="eye-slash"
                size={iconSize.fontAwesome}
                color={Colors.grey}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hollow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.grey,
  },
  nonHollow: {
    backgroundColor: Colors.white,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 18,
    transform: [{ translateY: 2 }],
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingRight: 10,
  },
  passwordIcon: {
    position: "absolute",
    right: 0,
  },
});
