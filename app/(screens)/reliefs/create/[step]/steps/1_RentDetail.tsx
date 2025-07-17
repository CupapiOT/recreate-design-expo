import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LabeledRadioButton } from "@/components";
import FormHeading from "@/app/(screens)/reliefs/components/FormHeading";
import { ReliefPostData } from "@/types/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";

export default function RentDetail() {
  const [checked, setChecked] =
    useState<ReliefPostData["rentDetail"]>("temporaryRelief");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData("reliefPostLocalStore")) as ReliefPostData;
        if (data && data.rentDetail) {
          setChecked(data.rentDetail as ReliefPostData["rentDetail"]);
        } else {
          updateNestedData(
            "reliefPostLocalStore",
            ["rentDetail"],
            "temporaryRelief",
          );
        }
      } catch (error) {
        console.error("Error loading rent detail:", error);
      }
    };

    loadData();
  }, []);

  const handleChange = (newData: ReliefPostData["rentDetail"]) => {
    setChecked(newData);
    updateNestedData("reliefPostLocalStore", ["rentDetail"], newData);
  };

  return (
    <View style={styles.container}>
      <FormHeading text="What are you looking for?" />
      <LabeledRadioButton
        label="Temporary Relief Driver"
        value="temporaryRelief"
        status={checked === "temporaryRelief" ? "checked" : "unchecked"}
        onPress={() => handleChange("temporaryRelief")}
      />
      <LabeledRadioButton
        label="Someone to take over my rental / leasing contract"
        value="takeOverContract"
        status={checked === "takeOverContract" ? "checked" : "unchecked"}
        onPress={() => handleChange("takeOverContract")}
      />
      <LabeledRadioButton
        label="Someone to share my vehicle"
        value="shareVehicle"
        status={checked === "shareVehicle" ? "checked" : "unchecked"}
        onPress={() => handleChange("shareVehicle")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
    width: "92.5%",
  },
});
