import { observer } from "mobx-react-lite";
import NotificationCard from "@/components/notifications/NotificationCard";
import { NotificationModelType } from "@/models/NotificationModel";
import { useNotificationsStore } from "@/contexts/NotificationsStoreContext";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { s } from "@/styles/common";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Themes";

const NotificationsList = observer(() => {
  const { // move to rootstore
    notifications,
    priorityNotification,
    state,
    setPriority,
    refresh,
    fetchNotifications,
    deleteNotification,
  } = useNotificationsStore();

  useEffect(() => {
    if (!notifications) fetchNotifications();
  });

  const renderInvisibleViewForSwipeToDismiss = () => (
    <View style={{ opacity: 0, width: "100%" }} />
  );
  const [_, forceRerender] = useState(0);

  // Defines a few functions for every notification.
  const renderNotification = useCallback(
    ({ item: notification }: { item: NotificationModelType }) => {
      const dismissNotification = (direction: "left" | "right") => {
        if (direction === "left") {
          deleteNotification(notification);
        }
      };

      const handlePrioritize = (notification: NotificationModelType) => {
        setPriority(notification);
        forceRerender((x) => x + 1); // force re-render
      };

      const renderLeftActions = () => (
        <RectButton
          style={[styles.favoriteButton]}
          onPress={() => handlePrioritize(notification)}
        >
          <View style={[styles.favoriteButton]} accessibilityRole="button">
            {priorityNotification !== notification ? (
              <Feather name="star" color={"#ffbb00"} size={30} />
            ) : (
              <FontAwesome name="star" color={"#ffbb00"} size={30} />
            )}
          </View>
        </RectButton>
      );

      return (
        <Swipeable
          renderLeftActions={renderLeftActions}
          renderRightActions={renderInvisibleViewForSwipeToDismiss}
          overshootRight={false}
          onSwipeableOpen={dismissNotification}
        >
          <NotificationCard
            notification={notification}
            isPriority={priorityNotification?.id === notification.id}
          />
        </Swipeable>
      );
    },
    [deleteNotification, priorityNotification, setPriority],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.FlatList
        data={notifications.slice()}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={20}
        style={[s.mainScrollContainer, styles.notificationsFlatList]}
        contentContainerStyle={[styles.notificationsContainer]}
        renderItem={renderNotification}
        itemLayoutAnimation={LinearTransition}
        showsVerticalScrollIndicator={false}

        onEndReached={state !== "empty" ? fetchNotifications : () => {}}
        onRefresh={refresh}
        refreshing={state === "pending"}
        // Having a footer magically prevents the problem of the last
        // notification flickering upon the removal of any notification before
        // it.
        ListFooterComponent={
          state === "empty" ? (
            <View style={styles.loadingContainer}>
              <Text style={[s.montserratFontSemiBold]}>
                End of notifications reached.
              </Text>
            </View>
          ) : state === "pending" ? (
            <ActivityIndicator style={styles.loadingContainer} size="large" />
          ) : (
            <View style={styles.loadingContainer} />
          )
        }
      />
    </GestureHandlerRootView>
  );
});

export default NotificationsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingContainer: {
    height: 80,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationsContainer: {
    gap: 8,
  },

  notificationsFlatList: {
    flex: 1,
  },

  favoriteButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledText: {
    color: Colors.grey,
  },
});
