import {
  View,
  Image,
  ImageSourcePropType,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Card from "./Card";
import { Colors } from "@/constants/Themes";
import { s } from "@/styles/common";
import VariableButton from "./VariableButton";

type PromoCardProps = {
  imageSrc: ImageSourcePropType;
  title: string;
  desc: string;
  onPress?: (event: GestureResponderEvent) => void;
};

// Seems like there are differences between the Figma demo and what the design
// dimensions are, so we have multipliers.
const scale = 1.05;
const cardWidth = 174 * scale;
const cardHeight = 233.5 * scale;
const imageHeight = 130 * scale;

export default function PromoCard({
  imageSrc,
  title,
  desc,
  onPress = () => {},
}: PromoCardProps) {
  return (
    <Card style={styles.container} padding={0}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSrc} />
      </View>
      <View style={styles.textAndButtonContainer}>
        <Text style={[styles.title, s.montserratFontMedium]}>{title}</Text>
        <Text numberOfLines={2} style={[styles.desc, s.montserratFontMedium]}>
          {desc}
        </Text>
        <VariableButton
          fontSize={13}
          width={cardWidth - 20}
          title="Get Coupon!"
          variant="small"
          onPress={onPress}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardHeight,
    flexDirection: "column",
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: cardWidth,
    height: imageHeight,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden"
  },
  image: {
    maxWidth: cardWidth,
    maxHeight: imageHeight,
  },
  textAndButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 9,
    height: cardHeight - imageHeight,
  },
  title: {
    color: Colors.primary,
    fontSize: 12,
  },
  desc: {
    color: Colors.black,
    fontSize: 13,
    flexShrink: 1,
    width: cardWidth - 20,
    marginBottom: "auto",
  },
});
