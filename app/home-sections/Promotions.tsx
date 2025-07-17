import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SectionTitle, PromoCard } from "@/components";
import { Promo } from "@/types/Promotion";
import { imageMap } from "@/constants/ImageMap";

type PromoListProps = {
  promos: Promo[];
};

export default function PromotionsSection({ promos }: PromoListProps) {
  return (
    <>
      <SectionTitle title="Benefits & Promotions" href="/promotions" />
      <View style={styles.cardsContainer}>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 380,
    justifyContent: "space-between",
    rowGap: 14,
  },
});
