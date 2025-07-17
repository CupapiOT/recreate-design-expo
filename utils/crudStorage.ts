import AsyncStorage from "@react-native-async-storage/async-storage";

type Data = {
  [key: string]: any;
};

const setData = async (key: string, data: Data | any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data: ", error);
  }
};

const getData = async (key: string): Promise<Data | any | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to get data: ", error);
    return null;
  }
};

const updateNestedData = async (
  key: string,
  path: string[],
  value: any,
): Promise<void> => {
  try {
    const existingData = (await getData(key)) as Data || {};

    // Create a deep copy and update the nested field
    const updatedData = { ...existingData };
    let current = updatedData;

    // Navigate to the parent of the field we want to update
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    // Set the final value
    current[path[path.length - 1]] = value;
    await setData(key, updatedData);
  } catch (error) {
    console.error("Error updating nested field:", error);
  }
};

export { Data, setData, getData, updateNestedData };
