import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native";
import { s } from "@/styles/common";
import Navbar from "@/components/layout/Navbar";
import { VariableButton } from "@/components";
import { router } from "expo-router";
import BottomSpacing from "@/components/layout/BottomSpacing";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { CarGradientIcon } from "@/constants/CustomIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "@/utils/crudStorage";

export default function ReliefScreen() {
  const startPostCreation = async () => {
    try {
      await AsyncStorage.removeItem("reliefPostLocalStore");
    } catch (error) {
      console.error("Error clearing form data:", error);
    }
    router.push({
      pathname: "/reliefs/create/[step]",
      params: { step: 1 },
    });
  };

  const seeLastNPost = async (n = 0) => {
    const lastUsedID = await getData("lastUsedID");
    if (lastUsedID != null && lastUsedID - 1 >= 0) {
      router.push({
        pathname: "/reliefs/post/[id]",
        params: { id: lastUsedID - n },
      });
    }
  };

  const resetEverything = async () => {
    try {
      await AsyncStorage.removeItem("reliefPostLocalStore");
      await AsyncStorage.removeItem("reliefPosts");
      await AsyncStorage.removeItem("lastUsedID");
    } catch (error) {
      console.error("Error resetting form data:", error);
    }
  };

  return (
    <SafeAreaView style={s.topContainer}>
      <ScreenHeader img={CarGradientIcon} title={"Relief Driver"} />
      <ScrollView
        style={s.mainScrollContainer}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <VariableButton
          title="List your vehicle now"
          variant="withArrow"
          onPress={startPostCreation}
        />
        <VariableButton
          title="See the last post"
          variant="withArrow"
          onPress={() => seeLastNPost()}
        />
        <VariableButton
          title="See the second-to-last post"
          variant="withArrow"
          onPress={() => seeLastNPost(1)}
        />
        <View style={{ flex: 1, height: "100%" }} />
        <VariableButton
          style={{ width: "100%" }}
          textStyle={[s.montserratFontExtraBold]}
          title="Reset Everything (Irreversable)"
          variant="red"
          onPress={resetEverything}
        />
      </ScrollView>
      <BottomSpacing />
      <Navbar whichSelected="relief" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
