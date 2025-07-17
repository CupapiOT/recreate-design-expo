import { View, Text } from "react-native";

export { default as S1_RentDetail } from "./1_RentDetail";
export { default as S2_VehicleDetails } from "./2_VehicleDetails";
export { default as S3_VehiclePhoto } from "./3_VehiclePhoto";
export { default as S4_ReliefPeriod } from "./4_ReliefPeriod";
export { default as S5_Location } from "./5_Location";
export { default as S6_Price } from "./6_Price";
export { default as S7_Description } from "./7_Description";

export default function ShouldNotBeVisible() {
  return (
    <View>
      <Text>
        If you&apos;re seeing this screen, that means something has gone wrong.
      </Text>
    </View>
  );
}
