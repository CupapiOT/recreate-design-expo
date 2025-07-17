import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FormHeading from "@/app/(screens)/reliefs/components/FormHeading";
import { TextField } from "@/components";
import { ReliefPostData } from "@/types/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";
import { s } from "@/styles/common";

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
