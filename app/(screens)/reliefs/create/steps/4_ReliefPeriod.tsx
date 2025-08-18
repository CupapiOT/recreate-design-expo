import { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { iconSize } from "@/styles/common";
import { pickDateTime } from "@/utils/pickDateTime";
import { FormHeading, PressableInput } from "@/components/relief-tab";
import { ReliefPostData } from "@/types/relief-tab/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";
import { getFormattedDay, getFormattedTime } from "@/utils/dateFormat";
import { ClockIcon, CalendarIcon } from "@/constants/CustomIcons";

export default function ReliefPeriod() {
  const [collectionDate, setCollectionDate] = useState<
    Date | "Collection Date" | null
  >("Collection Date");
  const [collectionTime, setCollectionTime] = useState<
    Date | "Collection Time" | null
  >("Collection Time");
  const [returnDate, setReturnDate] = useState<Date | "Return Date" | null>(
    "Return Date",
  );
  const [returnTime, setReturnTime] = useState<Date | "Return Time" | null>(
    "Return Time",
  );

  // Load from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData(
          "reliefPostLocalStore",
        )) as ReliefPostData | null;
        if (data && data?.reliefPeriod.collectionDate) {
          setCollectionDate(
            data.reliefPeriod
              .collectionDate as ReliefPostData["reliefPeriod"]["collectionDate"],
          );
        } else {
          setCollectionDate("Collection Date");
        }
        if (data && data?.reliefPeriod?.collectionTime) {
          setCollectionTime(
            data.reliefPeriod
              .collectionTime as ReliefPostData["reliefPeriod"]["collectionTime"],
          );
        } else {
          setCollectionTime("Collection Time");
        }
        if (data && data?.reliefPeriod?.returnDate) {
          setReturnDate(
            data.reliefPeriod
              .returnDate as ReliefPostData["reliefPeriod"]["returnDate"],
          );
        } else {
          setReturnDate("Return Date");
        }
        if (data && data?.reliefPeriod?.returnTime) {
          if (
            returnTime &&
            collectionTime &&
            returnTime < collectionTime &&
            collectionDate === returnDate
          ) {
            Alert.alert(
              "Info: Return time is earlier than collection time.",
              `Please select a time after:\n${getFormattedDay(collectionDate, true)}, ${getFormattedTime(collectionTime === "Collection Time" ? new Date() : collectionTime)}`,
            );
            onChangeReturnTime("", null);
          } else {
            setReturnTime(
              data.reliefPeriod
                .returnTime as ReliefPostData["reliefPeriod"]["returnTime"],
            );
          }
        } else {
          setReturnTime("Return Time");
        }
      } catch (error) {
        console.warn("Error loading relief dates:", error);
      }
    };

    loadData();
  });

  // Define functions to change states and upload to AsyncStorage.
  const onChangeCollectionDate = async (e: any, selectedDate: Date | null) => {
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "collectionDate"],
      selectedDate,
    );
    setCollectionDate(selectedDate);
  };
  const onChangeCollectionTime = async (e: any, selectedTime: Date | null) => {
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "collectionTime"],
      selectedTime,
    );
    setCollectionTime(selectedTime);
  };
  const onChangeReturnDate = async (e: any, selectedDate: Date | null) => {
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "returnDate"],
      selectedDate,
    );
    setReturnDate(selectedDate ?? "Return Date");
  };
  const onChangeReturnTime = async (e: any, selectedTime: Date | null) => {
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "returnTime"],
      selectedTime,
    );
    setReturnTime(selectedTime ?? "Return Time");
  };

  return (
    <View style={styles.container}>
      <FormHeading text="Temporary Relief Period" />
      <PressableInput
        value={
          collectionDate === "Collection Date"
            ? collectionDate
            : getFormattedDay(collectionDate, true)
        }
        onPress={() => {
          pickDateTime(collectionDate, "date", onChangeCollectionDate);
          if (collectionDate && returnDate && collectionDate > returnDate) {
            onChangeReturnDate("", null);
          }
        }}
        endIcon={
          <CalendarIcon width={iconSize.regular} height={iconSize.regular} />
        }
      />
      <PressableInput
        value={
          collectionTime === "Collection Time"
            ? collectionTime
            : getFormattedTime(collectionTime)
        }
        onPress={() => {
          pickDateTime(collectionTime, "time", onChangeCollectionTime);
        }}
        endIcon={
          <ClockIcon width={iconSize.regular} height={iconSize.regular} />
        }
      />
      <PressableInput
        value={
          returnDate === "Return Date"
            ? returnDate
            : getFormattedDay(returnDate, true)
        }
        onPress={() => {
          pickDateTime(returnDate, "date", onChangeReturnDate, collectionDate);
        }}
        endIcon={
          <CalendarIcon width={iconSize.regular} height={iconSize.regular} />
        }
      />
      <PressableInput
        value={
          returnTime === "Return Time"
            ? returnTime
            : getFormattedTime(returnTime)
        }
        onPress={() => {
          pickDateTime(returnTime, "time", onChangeReturnTime);
        }}
        endIcon={
          <ClockIcon width={iconSize.regular} height={iconSize.regular} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
});
