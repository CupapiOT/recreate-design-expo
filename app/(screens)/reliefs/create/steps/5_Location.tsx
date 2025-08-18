import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FormHeading } from "@/components/relief-tab";
import { Colors } from "@/constants/Themes";
import { s } from "@/styles/common";
import {
  AreasType,
  regions,
  getCorrespondingAreas,
} from "@/constants/singaporeLocations";
import { ReliefPostData } from "@/types/relief-tab/ReliefPost";
import { getData, updateNestedData } from "@/utils/crudStorage";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
  IAutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";

export default function Location() {
  const [region, setRegion] = useState<AreasType | "">("");
  const [areaOptions, setAreaOptions] = useState<
    AutocompleteDropdownItem[] | null
  >(null);
  const [area, setArea] = useState("");
  const parentController = useRef<IAutocompleteDropdownRef | null>(null);
  const childController = useRef<IAutocompleteDropdownRef | null>(null);
  // Specifically to disable weird on-load behavior that erases `area` twice
  // in a row. Not a state because it's just here as a counter.
  let initialMountCount = 0;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData(
          "reliefPostLocalStore",
        )) as ReliefPostData | null;

        if (data == null || data?.preferredLocation?.region == null) {
          return;
        }

        const savedRegion = data.preferredLocation.region as AreasType | "";
        if (savedRegion === "") {
          childController.current?.clear();
          parentController.current?.clear();
          setAreaOptions(null);
          setRegion(savedRegion);
          setArea("");
          return;
        }

        const regionChanged = savedRegion !== region;
        setRegion(savedRegion);
        setAreaOptions(getCorrespondingAreas(savedRegion));

        parentController.current?.setItem({
          title:
            regions.find((region) => region.id === savedRegion)?.title ?? "",
          id: savedRegion,
        });

        if (data?.preferredLocation?.area != null) {
          const savedArea = data.preferredLocation.area;
          if (regionChanged) {
            childController.current?.clear();
            return;
          }
          setArea(savedArea);
          childController.current?.setItem({
            title:
              areaOptions?.find((area) => area.id === savedArea)?.title ?? "",
            id: savedArea,
          });
        }
      } catch (error) {
        console.warn("Error loading region:", error);
      }
    };
    loadData();
  }, [areaOptions, region]);

  // If it's empty, then that means it's its first time loading. Either way, it
  // doesn't matter.
  const isValidToChange: boolean = region === "";
  if (isValidToChange) {
    // Let `handleRegionOption` update areas list.
    initialMountCount = 2;
  }

  const handleRegionOption = async (newRegion: AreasType | null) => {
    if (newRegion == null && initialMountCount > 1) {
      if (region === "" || area === "") return;
      await updateNestedData(
        "reliefPostLocalStore",
        ["preferredLocation", "region"],
        "",
      );
      await updateNestedData(
        "reliefPostLocalStore",
        ["preferredLocation", "area"],
        "",
      );
      setRegion("");
      setAreaOptions(null);
      setArea("");
      childController.current?.clear();
      return;
    }

    const safeRegion = newRegion ?? "";
    await updateNestedData(
      "reliefPostLocalStore",
      ["preferredLocation", "region"],
      safeRegion,
    );

    setRegion(safeRegion);
    // After being called twice, then it'll reset areas properly.
    // I am not sure why it gets called twice on mount in the first place.
    if (initialMountCount > 1) {
      await updateNestedData(
        "reliefPostLocalStore",
        ["preferredLocation", "area"],
        "",
      );
      setAreaOptions(safeRegion ? getCorrespondingAreas(safeRegion) : null);
      setArea("");
      childController.current?.clear();
    }
    initialMountCount++;
  };
  const handleAreaChange = async (newArea: string) => {
    // Prevents the double on-load updates that reset the area to `null` for
    // a reason beyond my understanding.
    const safeArea = newArea ?? "";
    if (safeArea === "") return;
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
      <AutocompleteDropdown
        controller={(c) => {
          parentController.current = c;
        }}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{ id: region }}
        onSelectItem={async (selectedRegion) =>
          selectedRegion &&
          (await handleRegionOption(selectedRegion.id as AreasType))
        }
        onClear={async () => await handleRegionOption(null)}
        textInputProps={{
          placeholder: "Search for region...",
          style: [s.montserratFontRegular, styles.inputText],
        }}
        inputContainerStyle={[styles.pickerSelect]}
        // onSelectItem={async (region as AreasType) => await handleRegionOption(region)}
        dataSet={regions}
        renderItem={(item) => (
          <Text style={[s.montserratFontRegular, styles.inputText]}>
            {item.title}
          </Text>
        )}
      />
      <AutocompleteDropdown
        controller={(c) => {
          childController.current = c;
        }}
        dataSet={areaOptions}
        editable={areaOptions != null}
        showChevron={areaOptions != null}
        showClear={areaOptions != null}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{ id: area }}
        onSelectItem={async (selectedArea) =>
          selectedArea && (await handleAreaChange(selectedArea.id))
        }
        textInputProps={{
          placeholder:
            areaOptions != null
              ? "Search for area..."
              : "Select a region first.",
          style: [s.montserratFontRegular, styles.inputText],
        }}
        inputContainerStyle={[styles.pickerSelect]}
        renderItem={(item) => (
          <Text style={[s.montserratFontRegular, styles.inputText]}>
            {item.title}
          </Text>
        )}
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
    height: 55,
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    padding: 10,
  },
});
