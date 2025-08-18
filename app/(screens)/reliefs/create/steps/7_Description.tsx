import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ReliefPostData } from "@/types/relief-tab/ReliefPost";
import { FormHeading } from "@/components/relief-tab";
import { TextField } from "@/components";
import { getData, updateNestedData } from "@/utils/crudStorage";

export default function Description() {
  const [desc, setDesc] = useState("");

  const handleChange = (newDesc: string) => {
    setDesc(newDesc);
    updateNestedData("reliefPostLocalStore", ["description"], newDesc);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData(
          "reliefPostLocalStore",
        )) as ReliefPostData | null;
        if (data && data.description) {
          setDesc(data.description as ReliefPostData["description"]);
        }
      } catch (error) {
        console.warn("Error loading desc:", error);
      }
    };
    loadData();
  }, []);

  return (
    <View style={[styles.container]}>
      <FormHeading text="Description" />
      <TextField
        value={desc}
        onChange={handleChange}
        multiline={true}
        style={styles.input}
        inputStyle={styles.inputStyle}
        placeholder="Enter description here!"
        fontSize={16}
        maxLength={500}
        numberOfLines={23}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 32,
  },
  input: {
    height: "80%",
    alignItems: "flex-start",
    paddingTop: 12,
  },
  inputStyle: {
    width: "100%",
  },
});
