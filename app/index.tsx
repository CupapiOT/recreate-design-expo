import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", rowGap: "20" }}> <Text>Welcome to the App!</Text>
      <Button title="Login" onPress={() => router.push("/login")} />
      <Button title="Sign Up" onPress={() => router.push("/signup")} />
    </View>
  );
}
