const getFormattedDay = (date: Date | undefined) => {
  if (date == null) {
    date = new Date();
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getFormattedTime = (time: Date | undefined) => {
  if (time == null) {
    time = new Date();
  }
  if (!(time instanceof Date)) {
    time = new Date(time);
  }
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(time);
};

export { getFormattedDay, getFormattedTime };
