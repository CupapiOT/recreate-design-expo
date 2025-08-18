import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Card } from "@/components";
import { ReliefPostData } from "@/types/relief-tab/ReliefPost";
import PriceDetails from "./PriceDetails";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Themes";
import { s, iconSize } from "@/styles/common";
import HorizontalLine from "../layout/HorizontalLine";
import {
  LocationPinIconWhite,
  CalendarGradientIcon,
  ClockGradientIcon,
} from "@/constants/CustomIcons";
import { router } from "expo-router";

type ReliefPostCardProps = {
  id: number;
  rentDetail: "temporaryRelief" | "takeOverContract" | "shareVehicle";
  vehicleDetails: {
    brand: string;
    model: string;
  };
  vehiclePhoto: string;
  location: string;
  reliefPeriod: {
    collectionDate: string;
    collectionTime: string;
    returnDate: string;
    returnTime: string;
  };
  price: {
    amount: string;
    cdw: "include" | "exclude";
  };
};

export default function ReliefPostCard({
  id,
  rentDetail,
  location,
  vehicleDetails: details,
  vehiclePhoto: photo,
  reliefPeriod: period,
  price,
}: ReliefPostCardProps) {
  const rentDetailLabels: Record<ReliefPostData["rentDetail"], string> = {
    temporaryRelief: "Temporary",
    takeOverContract: "Take Over",
    shareVehicle: "Share",
  };
  const formattedRentDetail = rentDetailLabels[rentDetail];

  return (
    <Pressable
      style={containerStyles.parent}
      onPress={() =>
        router.push({ pathname: "/reliefs/post/[id]", params: { id } })
      }
    >
      <Card
        style={rentDetailStyles.tag}
        borderRadius={15}
        paddingHorizontal={20}
        paddingVertical={8}
      >
        <Text style={[s.montserratFontSemiBold, rentDetailStyles.text]}>
          {formattedRentDetail}
        </Text>
      </Card>
      <View style={rentDetailStyles.tagFold} />
      <Card padding={20} style={containerStyles.top}>
        <Image style={containerStyles.image} source={{ uri: photo }} />

        <LinearGradient
          style={locationStyles.pill}
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <LocationPinIconWhite
            width={iconSize.regular}
            height={iconSize.regular}
          />
          <Text style={[s.montserratFontMedium, locationStyles.text]}>
            {location}
          </Text>
        </LinearGradient>

        <View style={containerStyles.periodAndPrice}>
          <View style={containerStyles.period}>
            <View style={containerStyles.dateAndTime}>
              <CalendarGradientIcon
                width={iconSize.regular}
                height={iconSize.regular}
              />
              <Text style={[s.montserratFontRegular]}>
                {period.collectionDate} ~ {period.returnDate}
              </Text>
            </View>
            <View style={containerStyles.dateAndTime}>
              <ClockGradientIcon
                width={iconSize.regular}
                height={iconSize.regular}
              />
              <Text style={[s.montserratFontRegular]}>
                {period.collectionTime} ~ {period.returnTime}
              </Text>
            </View>
          </View>
          <PriceDetails
            alignItems="center"
            amount={String(price.amount)}
            cdw={price.cdw}
          />
        </View>

        <HorizontalLine
          width={"100%"}
          style={{ position: "absolute", left: 20, top: "90%" }}
        />

        <Text style={[s.montserratFontBold, vehicleDetailsStyles.brand]}>
          {details.brand}
          {"   "}
          <Text style={[s.montserratFontLight]}>{details.model}</Text>
        </Text>
      </Card>
    </Pressable>
  );
}

const containerStyles = StyleSheet.create({
  parent: {
    position: "relative",
    overflow: "visible",
  },
  top: {
    gap: 16,
    overflow: "visible",
    width: "96%",
  },

  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    objectFit: "cover",
    borderRadius: 20,
  },

  periodAndPrice: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 25,
  },
  period: {
    left: 4,
    paddingTop: 12,
    flexDirection: "column",
    gap: 8,
  },
  dateAndTime: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
  },
});

const rentDetailStyles = StyleSheet.create({
  tag: {
    borderBottomLeftRadius: 0,
    position: "absolute",
    zIndex: 2,
    top: 20,
    left: -8,
    height: 40,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
  tagFold: {
    position: "absolute",
    zIndex: 3,
    top: 60,
    left: -9,
    borderTopWidth: 0,
    borderTopColor: "transparent",
    borderBottomWidth: 8,
    borderBottomColor: "transparent",
    borderRightWidth: 8,
    borderRightColor: "#1E4AD7",
  },
});

const locationStyles = StyleSheet.create({
  pill: {
    paddingBlock: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
    columnGap: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
});

const vehicleDetailsStyles = StyleSheet.create({
  brand: {
    fontSize: 16,
  },
});
