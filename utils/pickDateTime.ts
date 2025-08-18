import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

function getSafeDate(date: Date | string | null | undefined) {
  if (typeof date === "string") {
    try {
      date = new Date(date);
    } catch {
      date = new Date();
    }
  } else if (date == null) {
    date = new Date();
  }
  return date;
}

export function pickDateTime(
  currDate: Date | string | null,
  currentMode: "date" | "time",
  onChange: (event: any, selected: Date | null) => void,
  minimumDate?: Date | string | null,
) {
  let safeCurrDate = getSafeDate(currDate);
  let safeMinimumDate = getSafeDate(minimumDate);

  DateTimePickerAndroid.open({
    minimumDate: safeMinimumDate,
    value: safeCurrDate,
    mode: currentMode,
    onChange: (e, date) => onChange(e, date ?? null),
    is24Hour: false,
  });
}
