import { View, StyleSheet, Image } from "react-native";
import { VariableButton } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import FormHeading from "../components/FormHeading";
import { getData } from "@/utils/crudStorage";

export default function SuccessfulPost() {
  return (
    <SafeAreaView style={s.topContainer}>
      <View style={styles.textContainer}>
        <FormHeading
          textAlign="center"
          text="Congratulations!"
          headingNumber={1}
        />
        <FormHeading
          textAlign="center"
          text="Your post has been created successfully."
          headingNumber={2}
        />
        <Image
          style={styles.image}
          source={require("@/assets/images/postSuccessful.png")}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <VariableButton
          textStyle={[styles.moveText, s.montserratFontBold]}
          title={"Back To Home"}
          height={60}
          width="auto"
          style={[styles.button, styles.backToHomeButton]}
          variant="red"
          onPress={() =>
            router.push({
              pathname: "/",
            })
          }
        />
        <VariableButton
          textStyle={[styles.moveText, s.montserratFontBold]}
          title={"View Post"}
          height={60}
          width="auto"
          style={styles.button}
          variant="red"
          onPress={async () => {
            const lastUsedID: number = await getData("lastUsedID");
            router.push({
              pathname: "/reliefs/post/[id]",
              params: { id: lastUsedID },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  moveText: { fontSize: 18 },
  button: {
    flex: 1,
  },
  textContainer: {
    paddingTop: 40,
    rowGap: 16,
    flex: 1,
    alignContent: "center",
  },
  image: {
    marginTop: 40,
    marginInline: "auto",
  },
  backToHomeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingInline: 15,
  },
});
