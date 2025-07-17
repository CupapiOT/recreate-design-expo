import {
  SafeAreaView,
  View,
  Image,
  ImageSourcePropType,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";

type HeaderProps = {
  profileImage: ImageSourcePropType;
  profileName: string;
};

export default function ProfileHeader({ profileImage, profileName }: HeaderProps) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={[styles.text, s.montserratFontRegular]}>
          Hello!{" "}
          <Text style={[styles.text, s.montserratFontBold]}>{profileName}</Text>
        </Text>
      </View>
      <Ionicons
        onPress={() => router.push("/login")}
        name="notifications-sharp"
        size={30}
        color={Colors.primary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingTop: 35,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 18,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
  },
});
