const getFormattedDay = (
  date: Date | null,
  forceIncludeYear = false,
  compact = false,
) => {
  if (date == null) {
    date = new Date();
  } else if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Do not format the year unnecessecarily.
  const dateYear = date.getFullYear();
  const thisYear = new Date().getFullYear();
  if (dateYear === thisYear && forceIncludeYear === false) {
    if (compact) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "numeric",
      }).format(date);
    }
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  if (compact) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getFormattedTime = (time: Date | null) => {
  if (time == null) {
    time = new Date();
  } else if (!(time instanceof Date)) {
    time = new Date(time);
  }
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(time);
};

export { getFormattedDay, getFormattedTime };
