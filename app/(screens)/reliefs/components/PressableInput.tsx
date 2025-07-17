import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { formatToArray } from "@/utils/formatToArray";

type PressableInputProps = {
  value?: string;
  onPress: (args: any) => void;
  endIcon?: React.ReactNode;
  style?: any;
};

export default function PressableInput({
  value,
  onPress,
  endIcon,
  style,
}: PressableInputProps) {
  return (
    <Pressable
      style={[styles.container, ...formatToArray(style)]}
      onPress={onPress}
    >
      {value && (
        <Text style={[s.montserratFontRegular, styles.text]}>{value}</Text>
      )}
      {endIcon && <View>{endIcon}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
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
