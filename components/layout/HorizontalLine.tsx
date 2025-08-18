import { View, DimensionValue, ViewStyle } from "react-native";
import { Colors } from "@/constants/Themes";
import { formatToArray } from "@/utils/formatToArray";

type HorizontalLineProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  color?: string;
  marginVertical?: number;
  style?: ViewStyle;
};

export default function HorizontalLine({
  width = "100%",
  height = 1,
  color: backgroundColor = Colors.darkSilver,
  marginVertical = 16,
  style,
}: HorizontalLineProps) {
  return (
    <View
      style={[
        { width, height, backgroundColor, marginVertical },
        ...formatToArray(style),
      ]}
    />
  );
}
