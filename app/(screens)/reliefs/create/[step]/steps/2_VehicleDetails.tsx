import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import FormHeading from "@/app/(screens)/reliefs/components/FormHeading";
import { TextField } from "@/components";
import { ReliefPostData } from "@/types/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";

export default function VehicleDetails() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData(
          "reliefPostLocalStore",
        )) as ReliefPostData | null;
        if (data && data.vehicleDetails.brand) {
          setBrand(
            data.vehicleDetails
              .brand as ReliefPostData["vehicleDetails"]["brand"],
          );
        }
        if (data && data.vehicleDetails.model) {
          setModel(
            data.vehicleDetails
              .model as ReliefPostData["vehicleDetails"]["model"],
          );
        }
        if (data && data.vehicleDetails.plate) {
          setPlate(
            data.vehicleDetails
              .plate as ReliefPostData["vehicleDetails"]["plate"],
          );
        }
      } catch (error) {
        console.warn("Error loading vehicle detail:", error);
      }
    };

    loadData();
  }, []);

  const changeBrand = (newBrand: string) => {
    setBrand(newBrand);
    updateNestedData(
      "reliefPostLocalStore",
      ["vehicleDetails", "brand"],
      newBrand,
    );
  };
  const changeModel = (newModel: string) => {
    setModel(newModel);
    updateNestedData(
      "reliefPostLocalStore",
      ["vehicleDetails", "model"],
      newModel,
    );
  };
  const changePlate = (newPlate: string) => {
    setPlate(newPlate);
    updateNestedData(
      "reliefPostLocalStore",
      ["vehicleDetails", "plate"],
      newPlate,
    );
  };
  return (
    <View style={styles.container}>
      <FormHeading text="Please enter vehicle details." />
      <TextField placeholder="Brand" value={brand} onChange={changeBrand} />
      <TextField placeholder="Model" value={model} onChange={changeModel} />
      <TextField
        placeholder="License Plate"
        value={plate}
        onChange={changePlate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
});
