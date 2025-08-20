import { Pressable, View, Text, StatusBar, StyleSheet } from "react-native";
import { PressableInput } from "@/components/relief-tab";
import { pickDateTime } from "@/utils/pickDateTime";
import { getFormattedDay, getFormattedTime } from "@/utils/dateFormat";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Card, TextField, VariableButton } from "@/components";
import { useNotificationsStore } from "@/contexts/NotificationsStoreContext";
// import { fakerEN_US } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { s } from "@/styles/common";
import axios, { isAxiosError } from "axios";
import { ApiService } from "@/constants/api";
import { Post } from "@/types/Post";
import { lowerCaseToSentence } from "@/utils/caseFormat";
import BottomSpacing from "@/components/layout/BottomSpacing";

export default function NotificationAdminPanel() {
  const notificationsStore = useNotificationsStore();
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [timeStamp, setTimeStamp] = useState(new Date());
  const [timeStampDate, setTimeStampDate] = useState(new Date());
  const [timeStampTime, setTimeStampTime] = useState(new Date());
  const onSelectDate = (_: any, selectedDate: Date | null) => {
    setTimeStampDate(selectedDate ?? new Date());
    if (selectedDate) {
      const newDate = new Date(timeStamp);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setTimeStamp(newDate);
    }
  };
  const onSelectTime = (_: any, selectedTime: Date | null) => {
    setTimeStampTime(selectedTime ?? new Date());
    if (selectedTime) {
      const newTime = new Date(timeStamp);
      newTime.setHours(selectedTime.getHours());
      newTime.setMinutes(selectedTime.getMinutes());
      setTimeStamp(newTime);
    }
  };

  // const addNotification = () => {
  //   let randomDesc = fakerEN_US.lorem.words({ min: 2, max: 6 });
  //   randomDesc = randomDesc.charAt(0).toUpperCase() + randomDesc.slice(1) + ".";
  //
  //   notificationsStore.addNotification(
  //     title ?? fakerEN_US.commerce.productName(),
  //     desc ?? randomDesc,
  //     isNew,
  //     timeStamp,
  //   );
  // };

  const addNotificationWithAPI = async () => {
    // Notification IDs start at 0, but userIDs start at 1.
    const lastNotificationID = notificationsStore.lastId ?? 0;
    const safeUserID = (lastNotificationID % ApiService.NUM_OF_USERS) + 1;
    const userPostIDs = ApiService.getUsersPostIDs(safeUserID);
    let randomBetweenZeroToNine = Math.floor(Math.random() * 10);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            userId: safeUserID,
            // Get random post.
            id: userPostIDs[randomBetweenZeroToNine],
          },
        },
      );
      const post: Post = (await response.data)[0];
      const formatPostText = (text: string) => {
        const formatted = lowerCaseToSentence(text).replace(/\r?\n/g, " ");
        return formatted;
      }
      notificationsStore.addNotification(
        formatPostText(post.title),
        formatPostText(post.body),
        isNew,
        timeStamp,
      );
    } catch (error) {
      if (isAxiosError(error)) console.error("Axios Error:", error);
      else console.error("Unexpected Error:", error);
    }
  };

  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminPanelHeight, setAdminPanelHeight] = useState(0);
  const height = useSharedValue(adminPanelHeight);
  const onAdminPanelLayout = (event: any) => {
    const measuredHeight = event.nativeEvent.layout.height;
    if (measuredHeight !== adminPanelHeight)
      setAdminPanelHeight(measuredHeight);
  };
  useEffect(() => {
    height.value = withTiming(adminPanelOpen ? adminPanelHeight + 10 : 0, {
      duration: 100,
    });
  });
  const adminPanelAnimatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));
  return (
    <Card style={[styles.adminPanel]}>
      <Pressable onPress={() => setAdminPanelOpen(!adminPanelOpen)}>
        <Text style={[s.montserratFontBold, { fontSize: 16 }]}>
          Add Notifications (Press to toggle panel)
        </Text>
      </Pressable>
      <Animated.View style={adminPanelAnimatedStyle}>
        <View>
          <TextField
            placeholder="Title"
            value={title ?? ""}
            onChange={setTitle}
          />
          <TextField placeholder="Desc" value={desc ?? ""} onChange={setDesc} />
          <PressableInput
            value={getFormattedDay(timeStampDate)}
            onPress={() =>
              pickDateTime(timeStampDate, "date", onSelectDate, new Date(0))
            }
          />
          <PressableInput
            value={getFormattedTime(timeStampTime)}
            onPress={() => pickDateTime(timeStampTime, "time", onSelectTime)}
          />
          <PressableInput
            value={`Toggle read/unread: ${isNew ? "Unread" : "Read"}`}
            onPress={() => setIsNew(!isNew)}
          />
        </View>
        <VariableButton
          style={{ width: "100%" }}
          title="Add New Notification"
          onPress={addNotificationWithAPI}
        />
        <BottomSpacing height={8} />
        <VariableButton
          style={{ width: "100%" }}
          title="Reset Everything"
          onPress={notificationsStore.reset}
          variant="small"
        />
      </Animated.View>

      {/* Invisible copy of animated view to measure the height. */}
      <View style={[styles.hidden]} onLayout={onAdminPanelLayout}>
        <View>
          <TextField />
          <TextField />
          <PressableInput onPress={() => {}} />
          <PressableInput onPress={() => {}} />
          <PressableInput onPress={() => {}} />
        </View>
        <VariableButton />
        <BottomSpacing height={8} />
        <VariableButton variant="small" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  adminPanel: {
    position: "absolute",
    bottom: 0,
    width: "93.75%",
    marginBottom: StatusBar.currentHeight,
  },

  hidden: {
    position: "absolute",
    opacity: 0,
    right: "100%",
    top: 0,
  },
});
