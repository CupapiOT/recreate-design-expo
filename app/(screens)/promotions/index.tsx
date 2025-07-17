import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { PromoCard } from "@/components";
import { imageMap } from "@/constants/ImageMap";
import { s } from "@/styles/common";
import InfoHeader from "@/components/layout/InfoHeader";
import { router } from "expo-router";
import { promotionsData } from "@/app/index";

export default function PromotionsScreen() {
  const promos = promotionsData;
  return (
      <SafeAreaView style={s.topContainer}>
        <InfoHeader title="Benefits & Promotions" />
        <ScrollView
          contentContainerStyle={[s.mainScrollContainer, styles.cardsContainer]}
        >
          {promos.map((promo, index) => (
            <PromoCard
              key={index}
              imageSrc={imageMap[promo.logoService]}
              title={promo.title}
              desc={promo.description}
              onPress={() =>
                router.push({
                  pathname: "/promotions/detail/[id]",
                  params: { id: promo.id },
                })
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "92.5%",
    justifyContent: "space-between",
    rowGap: 14,
  },
});
