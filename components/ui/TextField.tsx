import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ViewStyle,
} from "react-native";
import { iconSize, s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { FontAwesome } from "@expo/vector-icons";
import { formatToArray } from "@/utils/formatToArray";

export type TextFieldProps = {
  placeholder?: string;
  hollow?: boolean;
  style?: ViewStyle | ViewStyle[];
  fontSize?: number;
  inputStyle?: any;
  type?: "text" | "number" | "email" | "password" | "tel";
  multiline?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange?: (text: string) => void;
  value?: string;
  disabled?: boolean;
  maxLength?: number;
  numberOfLines?: number;
};

export default function TextField({
  placeholder,
  hollow,
  style,
  fontSize = 18,
  type = "text",
  multiline = false,
  startIcon,
  inputStyle,
  endIcon,
  onChange,
  value,
  disabled,
  maxLength,
  numberOfLines,
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View
      style={[
        hollow ? styles.hollow : styles.nonHollow,
        s.roundingAndPadding,
        ...formatToArray(style),
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
            { fontSize: fontSize },
            ...formatToArray(inputStyle),
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
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          maxLength={maxLength}
        />
        {endIcon && <View style={[styles.endIconContainer]}>{endIcon}</View>}
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
                size={iconSize.large}
                color={Colors.grey}
              />
            ) : (
              <FontAwesome
                name="eye-slash"
                size={iconSize.large}
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
    height: 55,
  },
  nonHollow: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    height: 55,
  },
  buttonText: {
    transform: [{ translateY: 2 }],
    textAlignVertical: "top",
    height: "100%",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingRight: 10,
  },
  endIconContainer: {
    marginLeft: "auto",
  },
  passwordIcon: {
    position: "absolute",
    right: 0,
  },
});
