import { RadioButton } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";

type LabeledRadioProps = {
  label?: string;
  value: string;
  status: "checked" | "unchecked";
  onPress: () => void;
};

export default function LabeledRadioButton({
  label = "",
  value,
  status,
  onPress,
}: LabeledRadioProps) {
  return (
    <View style={styles.container}>
      <RadioButton
        value={value}
        status={status}
        onPress={onPress}
        uncheckedColor={Colors.grey}
        color={Colors.secondary}
      />
      <Text style={[styles.labelText, s.montserratFontRegular]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  labelText: {
    fontSize: 18,
  }
});
