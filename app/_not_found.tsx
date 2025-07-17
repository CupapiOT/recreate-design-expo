import { Text, SafeAreaView } from "react-native";
import { s } from "@/styles/common";

export default function NotFound() {
  return (
    <SafeAreaView>
      <Text style={s.montserratFontBold}>Oops! Page not found.</Text>
    </SafeAreaView>
  );
}
