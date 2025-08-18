import { View, Text, StyleSheet } from "react-native";
import PostInfoText from "./PostInfoText";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";

type PriceDetailsProps = {
  amount: string;
  cdw: "include" | "exclude";
  alignItems?: "flex-start" | "center";
  priceFontSize?: number;
};

export default function PriceDetails({
  amount,
  cdw,
  alignItems = "flex-start",
  priceFontSize = 32,
}: PriceDetailsProps) {
  return (
    <View style={[{ alignItems }, styles.priceContainer]}>
      <View
        style={[
          styles.priceAmountContainer,
        ]}
      >
        <Text
          style={[
            styles.price,
            s.montserratFontBold,
            { fontSize: priceFontSize },
          ]}
        >
          ${amount}
        </Text>
        <Text style={[styles.priceSuffix, s.montserratFontRegular]}>/day</Text>
      </View>
      <PostInfoText headingType="tag">
        {cdw === "include" ? "With CDW" : "Without CDW"}
      </PostInfoText>
    </View>
  );
}

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "column",
  },
  priceAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: Colors.primary,
  },
  priceSuffix: {
    fontSize: 18,
    color: Colors.text,
  },
});
