import { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { FormHeading } from "@/components/relief-tab";
import { UploadImage } from "@/constants/CustomIcons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Themes";
import { getData, updateNestedData } from "@/utils/crudStorage";
import { ReliefPostData } from "@/types/relief-tab/ReliefPost";

export default function VehiclePhoto() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData("reliefPostLocalStore")) as ReliefPostData;
        if (data && data.vehiclePhoto) {
          setImage(data.vehiclePhoto as ReliefPostData["vehiclePhoto"]);
        }
      } catch (error) {
        console.warn("Error loading vehicle photo:", error);
      }
    };

    loadData();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      aspect: [16, 9]
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      updateNestedData("reliefPostLocalStore", ["vehiclePhoto"], uri);
    }
  };
  return (
    <View style={styles.container}>
      <FormHeading text="Upload a photo of your vehicle’s front clearly showing your license plate and PHV decal if your vehicle is a PHV" />
      <Pressable
        style={[styles.imageContainer]}
        onPress={async () => await pickImage()}
      >
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <UploadImage width={70} height={70} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 4 / 3,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  }
});
