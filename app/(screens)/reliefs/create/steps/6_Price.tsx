import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FormHeading } from "@/components/relief-tab";
import { ReliefPostData } from "@/types/relief-tab/ReliefPost";
import { TextField, LabeledRadioButton } from "@/components";
import { Feather } from "@expo/vector-icons";
import { iconSize } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { getData, updateNestedData } from "@/utils/crudStorage";

export default function Price() {
  const [checked, setChecked] =
    useState<ReliefPostData["price"]["cdw"]>("include");
  const [price, setPrice] = useState(0);
  const handleCheckChange = (newChecked: ReliefPostData["price"]["cdw"]) => {
    setChecked(newChecked);
    updateNestedData("reliefPostLocalStore", ["price", "cdw"], newChecked);
  };
  const handlePriceChange = (newPrice: ReliefPostData["price"]["amount"]) => {
    setPrice(newPrice);
    updateNestedData("reliefPostLocalStore", ["price", "amount"], newPrice);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getData("reliefPostLocalStore");
        if (data && data.price) {
          setPrice(data.price.amount as ReliefPostData["price"]["amount"]);
        } else {
          await updateNestedData("reliefPostLocalStore", ["price", "amount"], 0);
        }
        if (data && data.price) {
          setChecked(data.price.cdw as ReliefPostData["price"]["cdw"]);
        } else {
          await updateNestedData("reliefPostLocalStore", ["price", "cdw"], "include");
        }
      } catch (error) {
        console.warn("Error loading price details:", error);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FormHeading text="Set your Price / Day" />
      <TextField
        placeholder="Enter price"
        type="number"
        value={String(price) === "0" ? "" : String(price)}
        onChange={(newPrice) => {
          handlePriceChange(Number(newPrice));
        }}
        endIcon={
          <Feather
            name="dollar-sign"
            size={iconSize.regular}
            color={Colors.grey}
          />
        }
      />
      <LabeledRadioButton
        label="Include CDW"
        value="include"
        status={checked === "include" ? "checked" : "unchecked"}
        onPress={() => handleCheckChange("include")}
      />
      <LabeledRadioButton
        label="Exclude CDW"
        value="exclude"
        status={checked === "exclude" ? "checked" : "unchecked"}
        onPress={() => handleCheckChange("exclude")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
  input: {
    height: "80%",
    alignItems: "flex-start",
    paddingTop: 12,
  },
});
