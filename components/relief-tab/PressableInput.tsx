import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  DimensionValue,
  TextStyle,
} from "react-native";
import { formatToArray } from "@/utils/formatToArray";

type PressableInputProps = {
  value?: string;
  onPress: (args: any) => void;
  endIcon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  width?: DimensionValue;
  textStyle?: TextStyle | TextStyle[];
};

export default function PressableInput({
  value,
  onPress,
  endIcon,
  style,
  width = "auto",
  textStyle,
}: PressableInputProps) {
  return (
    <Pressable
      style={[styles.container, { width }, ...formatToArray(style)]}
      onPress={onPress}
    >
      {value && (
        <Text
          style={[
            s.montserratFontRegular,
            styles.text,
            formatToArray(textStyle),
          ]}
        >
          {value}
        </Text>
      )}
      {endIcon && <View>{endIcon}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
    paddingInline: 18,
    borderRadius: 20,
    height: 55,
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 18,
    transform: [{ translateY: 2 }],
  },
});
