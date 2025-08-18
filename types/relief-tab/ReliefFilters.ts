type ReliefPostsFilters = {
  // Unnested so that updating can be done with a simple helper function.
  dateFrom: Date | null;
  dateTo: Date | null;
  timeFrom: Date | null;
  timeTo: Date | null;
  priceFrom: number | null;
  priceTo: number | null;
  brand: string | null;
};

type ReliefPostsSortBy = {
  timePosted: "oldestFirst" | "newestFirst" | null;
  price: "lowestFirst" | "highestFirst" | null;
  duration: "shortestFirst" | "longestFirst" | null;
  // I would do this, but it'd be invalid as soon as my local time goes
  // beyond the first post.
  // availabilityWindow: "soonestAvailableFirst" | "latestAvailableFirst"
};

const defaultReliefPostsFilters: ReliefPostsFilters = {
  dateFrom: null,
  dateTo: null,
  timeFrom: null,
  timeTo: null,
  priceFrom: null,
  priceTo: null,
  brand: null,
};

const defaultReliefPostsSortBy: ReliefPostsSortBy = {
  timePosted: "newestFirst",
  price: null,
  duration: null,
};

// Create AutocompleteDropdownItem-based types for sortBy.
type sortByDropdownType<K extends keyof ReliefPostsSortBy> = {
  id: Exclude<ReliefPostsSortBy[K], null>;
  title: string;
}[];
const reliefPostsSortByTimePostedDropdown: sortByDropdownType<"timePosted"> = [
  { id: "newestFirst", title: "Newest First" },
  { id: "oldestFirst", title: "Oldest First" },
];
const reliefPostsSortByPriceDropdown: sortByDropdownType<"price"> = [
  { id: "highestFirst", title: "Highest First" },
  { id: "lowestFirst", title: "Lowest First" },
];
const reliefPostsSortByDurationDropdown: sortByDropdownType<"duration"> = [
  { id: "longestFirst", title: "Longest First" },
  { id: "shortestFirst", title: "Shortest First" },
];
const sortByDropdownData: {
  [K in keyof ReliefPostsSortBy]: sortByDropdownType<K>;
} = {
  timePosted: reliefPostsSortByTimePostedDropdown,
  price: reliefPostsSortByPriceDropdown,
  duration: reliefPostsSortByDurationDropdown,
};

export {
  ReliefPostsFilters,
  defaultReliefPostsFilters,
  ReliefPostsSortBy,
  defaultReliefPostsSortBy,
  sortByDropdownType,
  sortByDropdownData,
};

export default {};
