import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import FormHeading from "@/app/(screens)/reliefs/components/FormHeading";
import PickerSelect from "react-native-picker-select";
import { Colors } from "@/constants/Themes";
import { s } from "@/styles/common";
import {
  AreasType,
  regions,
  areas,
  getCorrespondingAreas,
} from "@/constants/singaporeLocations";
import { ReliefPostData } from "@/types/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";

export default function Location() {
  const [region, setRegion] = useState<AreasType>("central");
  const [areaOptions, setAreaOptions] = useState(areas.central);
  const [area, setArea] = useState("");
  // Specifically to disable weird on-load behavior that erases `area` twice
  // in a row. Not a state because it's just here as a counter.
  let initialMountCount = 0;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData(
          "reliefPostLocalStore",
        )) as ReliefPostData | null;
        if (data && data?.preferredLocation?.region != null) {
          const savedRegion = data.preferredLocation.region as AreasType;
          setRegion(savedRegion);
          setAreaOptions(getCorrespondingAreas(savedRegion));
        }
        if (data && data?.preferredLocation?.area != null) {
          setArea(
            data.preferredLocation
              .area as ReliefPostData["preferredLocation"]["area"],
          );
        }
      } catch (error) {
        console.warn("Error loading region:", error);
      }
    };
    loadData();
  }, []);

  // I am not sure why, but if Asia (the default region) is what is selected,
  // then we don't need to worry about it updating prematurely.
  const isValidToChange: boolean = region === "central";
  if (isValidToChange) {
    // Let `handleRegionOption` update areas list.
    initialMountCount = 2;
  }

  const handleRegionOption = async (newRegion: AreasType) => {
    setRegion(newRegion);
    await updateNestedData(
      "reliefPostLocalStore",
      ["preferredLocation", "region"],
      newRegion,
    );
    // After being called twice, then it'll reset areas properly.
    // I am not sure why it gets called twice on mount in the first place.
    if (initialMountCount > 1) {
      setAreaOptions(getCorrespondingAreas(newRegion));
      setArea("");
      await updateNestedData(
        "reliefPostLocalStore",
        ["preferredLocation", "area"],
        "",
      );
    }
    initialMountCount++;
  };
  const handleAreaChange = async (newArea: string) => {
    // Prevents the double on-load updates that reset the area to `null` for
    // a reason beyond my understanding.
    const safeArea = newArea ?? "";
    setArea(safeArea);
    await updateNestedData(
      "reliefPostLocalStore",
      ["preferredLocation", "area"],
      safeArea,
    );
  };

  return (
    <View style={styles.container}>
      <FormHeading text="Preferred Location" />
      <PickerSelect
        key={1}
        onValueChange={async (region) => {
          await handleRegionOption(region);
        }}
        value={region}
        style={{
          viewContainer: styles.pickerSelect,
          inputIOS: [s.montserratFontRegular, styles.inputText],
          inputAndroid: [s.montserratFontRegular, styles.inputText],
        }}
        items={regions}
      />
      <PickerSelect
        key={2}
        value={area}
        onValueChange={async (area) => await handleAreaChange(area)}
        style={{
          viewContainer: styles.pickerSelect,
          inputIOS: [s.montserratFontRegular, styles.inputText],
          inputAndroid: [s.montserratFontRegular, styles.inputText],
        }}
        items={areaOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
  pickerSelect: {
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  inputText: {
    fontSize: 18,
  },
});
