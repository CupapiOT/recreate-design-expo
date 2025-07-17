import { View, DimensionValue } from "react-native";
import { Colors } from "@/constants/Themes";

type HorizontalLineProps = {
  width?: DimensionValue;
  height?: number;
  color?: string;
  marginVertical?: number;
};

export default function HorizontalLine({
  width = "100%",
  height = 1,
  color: backgroundColor = Colors.darkSilver,
  marginVertical = 16,
}: HorizontalLineProps) {
  return <View style={{ width, height, backgroundColor, marginVertical }} />;
}
