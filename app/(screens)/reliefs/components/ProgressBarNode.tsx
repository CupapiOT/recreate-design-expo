import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Themes";

type ProgressBarNodeProps = {
  isActive?: boolean;
};

export default function ProgressBarNode({ isActive = false }: ProgressBarNodeProps) {
  return (
    <LinearGradient
      style={styles.node}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        isActive
          ? [Colors.primary, Colors.secondary]
          : [Colors.grey, Colors.grey]
      }
    />
  );
}

const styles = StyleSheet.create({
  node: {
    flex: 1,
    maxHeight: 6,
    height: 6,
    borderRadius: 99,
  },
});
