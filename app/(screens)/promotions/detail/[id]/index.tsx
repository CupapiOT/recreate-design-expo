import {
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import { s } from "@/styles/common";
import InfoHeader from "@/components/layout/InfoHeader";
import { useRoute, RouteProp } from "@react-navigation/native";
import { promotionsData } from "@/app/index";
import { imageMap } from "@/constants/ImageMap";
import { Card, VariableButton, InfoCard } from "@/components";
import { Colors } from "@/constants/Themes";
import BottomSpacing from "@/components/layout/BottomSpacing";

export default function PromotionDetailsScreen() {
  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const { id } = route.params;

  const promo = promotionsData.find((promo) => promo.id === id);
  const imageKey = promo?.image || "carwash";
  const logoKey = promo?.logoService || "carwash";

  return (
      <SafeAreaView style={s.topContainer}>
        <InfoHeader title={promo?.title} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image style={styles.image} source={imageMap[imageKey]} />
          {promo?.discount && (
            <Card padding={15} style={styles.discountContainer}>
              <Text style={[styles.discountText, s.montserratFontMedium]}>
                {promo.discount}
              </Text>
            </Card>
          )}
          <VariableButton title="Buy Now" variant="gradient" fontSize={16} />
          {promo?.info && <InfoCard title="Info" desc={promo.info} />}
          {promo?.howToUse && (
            <InfoCard title="How to use" desc={promo.howToUse} />
          )}
          {promo?.termCondition && (
            <InfoCard
              title="Terms and Conditions"
              href="https://www.privacypolicyonline.com/sample-terms-conditions-template/"
              desc={promo.termCondition}
            />
          )}
          {promo?.cancellationPolicy && (
            <InfoCard
              title="Cancellation Policy"
              desc={promo.cancellationPolicy}
            />
          )}
          <Card style={styles.companyContainer} padding={24}>
            <Image style={styles.companyLogo} source={imageMap[logoKey]} />
            <Text style={[styles.companyText, s.montserratFontSemiBold]}>
              {promo?.title}
            </Text>
          </Card>
        <BottomSpacing />
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    rowGap: 15,
    maxWidth: 380,
  },
  image: {
    width: 380,
    height: 260,
    borderRadius: 20,
  },
  discountContainer: {
    backgroundColor: Colors.primary,
    paddingInline: 20,
  },
  discountText: {
    color: Colors.white,
    fontSize: 16,
  },
  companyContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  companyLogo: {
    maxWidth: 80,
    maxHeight: 75,
  },
  companyText: {
    fontSize: 18,
    color: Colors.accent,
  },
});
