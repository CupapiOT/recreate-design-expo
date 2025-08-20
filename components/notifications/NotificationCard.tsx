import { View, Text, StyleSheet } from "react-native";
import Card from "../ui/Card";
import { Colors } from "@/constants/Themes";
import { LinearGradient } from "expo-linear-gradient";
import { Megaphone } from "@/constants/CustomIcons";
import { s } from "@/styles/common";
import { NotificationModelType } from "@/models/NotificationModel";
import { Feather } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";

export const CARD_HEIGHT = 80;

type NotificationCardProps = {
  notification: NotificationModelType;
  isPriority: boolean;
};

const NotificationCard = observer(
  ({ notification, isPriority }: NotificationCardProps) => {
    return (
      <Card
        style={styles.container}
        padding={16}
        variant="pressable"
        onPress={() => {
          notification.toggleNew();
        }}
      >
        <LinearGradient
          style={styles.notificationImage}
          colors={[Colors.primary, Colors.secondary]}
        >
          {isPriority ? (
            <Feather name="star" color={Colors.white} size={24} />
          ) : (
            <Megaphone height={24} width={24} />
          )}
        </LinearGradient>
        <View style={styles.infoContainer}>
          <Text
            style={[styles.titleText, s.montserratFontMedium]}
            numberOfLines={3}
          >
            {notification.title}
          </Text>
          <Text
            style={[styles.descText, s.montserratFontRegular]}
            numberOfLines={5}
          >
            {notification.desc}
          </Text>
        </View>

        <Text style={[styles.howLongAgo, s.montserratFontRegular]}>
          {notification.howLongAgo}
        </Text>
        {notification.isNew && <View style={styles.newNotification} />}
      </Card>
    );
  },
);

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
  },
  notificationImage: {
    borderRadius: 99,
    aspectRatio: 1,
    padding: 12,
    maxWidth: 48,
    maxHeight: 48,
  },
  infoContainer: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  titleText: {
    width: "60%",
    fontSize: 16,
    color: Colors.accent,
  },
  descText: {
    width: "75%",
    fontSize: 14,
    color: Colors.black,
  },
  howLongAgo: {
    position: "absolute",
    top: 16,
    right: 16,
    color: Colors.grey,
  },
  newNotification: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: Colors.red,
    padding: 5,
    borderRadius: 999,
  },
});
