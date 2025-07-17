import { SafeAreaView, ScrollView } from "react-native";
import { s } from "@/styles/common";
import { VariableButton } from "@/components";
import Navbar from "@/components/layout/Navbar";
import ProfileHeader from "@/components/layout/ProfileHeader";
import BottomSpacing from "@/components/layout/BottomSpacing";
import { router } from "expo-router";
import PromotionsSection from "./home-sections/Promotions";
import { Promo } from "@/types/Promotion";
import rawPromotionsData from "@/data/dummyPromotions.json";

export const promotionsData = rawPromotionsData as Promo[];

export default function Index() {
  const profileHeader = {
    image: require("@/assets/images/profile.png"),
    name: "John",
  };
  const profileVerified = false;

  return (
    <SafeAreaView style={s.topContainer}>
      <ProfileHeader
        profileImage={profileHeader.image}
        profileName={profileHeader.name}
      />
      <ScrollView
        style={s.mainScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {profileVerified || (
          <VariableButton
            style={{ marginBottom: 20 }}
            variant="withArrow"
            title="Verify your profile to get full benefits"
            onPress={() => router.push("/login")}
          />
        )}
        <PromotionsSection promos={promotionsData} />
      </ScrollView>
      <BottomSpacing />
      <Navbar whichSelected="home" />
    </SafeAreaView>
  );
}
