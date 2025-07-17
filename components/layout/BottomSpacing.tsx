import { View } from "react-native";

export default function BottomSpacing({ height = 50 }: { height?: number }) {
  return <View style={{ height: height }} />;
}
