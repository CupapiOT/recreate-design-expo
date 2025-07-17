import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import FormHeading from "@/app/(screens)/reliefs/components/FormHeading";
import { Feather } from "@expo/vector-icons";
import { iconSize } from "@/styles/common";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import PressableInput from "../../../components/PressableInput";
import { ReliefPostData } from "@/types/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";
import { getFormattedDay, getFormattedTime } from "@/utils/dateFormat";

export default function ReliefPeriod() {
  const [collectionDate, setCollectionDate] = useState<
    Date | "Collection Date" | undefined
  >("Collection Date");
  const [collectionTime, setCollectionTime] = useState<
    Date | "Collection Time" | undefined
  >("Collection Time");
  const [returnDate, setReturnDate] = useState<
    Date | "Return Date" | undefined
  >("Return Date");
  const [returnTime, setReturnTime] = useState<
    Date | "Return Time" | undefined
  >("Return Time");

  // Load from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData(
          "reliefPostLocalStore",
        )) as ReliefPostData | null;
        if (data && data?.reliefPeriod.collectionDate) {
          console.log(data?.reliefPeriod.collectionDate);
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
          setReturnTime(
            data.reliefPeriod
              .returnTime as ReliefPostData["reliefPeriod"]["returnTime"],
          );
        } else {
          setReturnTime("Return Time");
        }
      } catch (error) {
        console.warn("Error loading relief dates:", error);
      }
    };

    loadData();
  }, []);

  // Define functions to change states and upload to AsyncStorage.
  const onChangeCollectionDate = async (
    e: any,
    selectedDate: Date | undefined,
  ) => {
    setCollectionDate(selectedDate);
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "collectionDate"],
      selectedDate,
    );
  };
  const onChangeCollectionTime = async (
    e: any,
    selectedTime: Date | undefined,
  ) => {
    setCollectionTime(selectedTime);
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "collectionTime"],
      selectedTime,
    );
  };
  const onChangeReturnDate = async (e: any, selectedDate: Date | undefined) => {
    setReturnDate(selectedDate);
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "returnDate"],
      selectedDate,
    );
  };
  const onChangeReturnTime = async (e: any, selectedTime: Date | undefined) => {
    setReturnTime(selectedTime);
    await updateNestedData(
      "reliefPostLocalStore",
      ["reliefPeriod", "returnTime"],
      selectedTime,
    );
  };

  const showMode = (
    date: Date | undefined,
    currentMode: "date" | "time",
    onChange: (event: any, selected: Date | undefined) => void,
  ) => {
    if (!(date instanceof Date)) {
      date = new Date();
    }
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      onChange: onChange,
      is24Hour: false,
    });
  };

  console.log(collectionDate instanceof Date);
  console.log(typeof collectionDate);
  console.log();

  return (
    <View style={styles.container}>
      <FormHeading text="Temporary Relief Period" />
      <PressableInput
        value={
          collectionDate === "Collection Date"
            ? collectionDate
            : getFormattedDay(collectionDate)
        }
        onPress={() => {
          showMode(
            collectionDate instanceof Date ? collectionDate : new Date(),
            "date",
            onChangeCollectionDate,
          );
        }}
        endIcon={<Feather size={iconSize.regular} name="calendar" />}
      />
      <PressableInput
        value={
          collectionTime === "Collection Time"
            ? collectionTime
            : getFormattedTime(collectionTime)
        }
        onPress={() => {
          showMode(
            collectionTime instanceof Date ? collectionTime : new Date(),
            "time",
            onChangeCollectionTime,
          );
        }}
        endIcon={<Feather size={iconSize.regular} name="clock" />}
      />
      <PressableInput
        value={
          returnDate === "Return Date"
            ? returnDate
            : getFormattedDay(returnDate)
        }
        onPress={() => {
          showMode(
            returnDate instanceof Date ? returnDate : new Date(),
            "date",
            onChangeReturnDate,
          );
        }}
        endIcon={<Feather size={iconSize.regular} name="calendar" />}
      />
      <PressableInput
        value={
          returnTime === "Return Time"
            ? returnTime
            : getFormattedTime(returnTime)
        }
        onPress={() => {
          showMode(
            returnTime instanceof Date ? returnTime : new Date(),
            "time",
            onChangeReturnTime,
          );
        }}
        endIcon={<Feather size={iconSize.regular} name="clock" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
});
