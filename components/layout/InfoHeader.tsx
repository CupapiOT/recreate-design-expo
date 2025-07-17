import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { VariableButton } from "@/components";
import { s, iconSize } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

type InfoHeaderProps = {
  title?: string;
  onBack?: (event: GestureResponderEvent) => void;
  paddingTop?: number;
  paddingBottom?: number;
};

/**
 * It's called an info-header because there is always a back button for it.
 * It's something you access by clicking on some other main screen.
 */
export default function InfoHeader({
  title = "",
  onBack = () => router.back(),
  paddingTop = 30,
  paddingBottom = 16,
}: InfoHeaderProps) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: paddingTop, paddingBottom: paddingBottom },
      ]}
    >
      <View style={styles.side}>
        <VariableButton
          image={
            <Feather
              name="chevron-left"
              size={iconSize.regular}
              color={Colors.primary}
            />
          }
          variant="action"
          onPress={onBack}
        />
      </View>
      <Text style={[styles.title, s.montserratFontMedium]}>{title}</Text>
      <View style={styles.side} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    top: 0,
    zIndex: 998,
  },
  side: {
    width: 48, // same as button width to balance space
    alignItems: "center",
    justifyContent: "center",
    left: 15,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: Colors.accent,
  },
});
