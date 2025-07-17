const continents = [
  { label: "Asia", value: "asia" },
  { label: "Africa", value: "africa" },
  { label: "Americas", value: "america" },
  { label: "Europe", value: "europe" },
  { label: "Australia", value: "australia" },
];
const asiaCountries = [
  { label: "Indonesia", value: "indonesia" },
  { label: "Myanmar", value: "myanmar" },
  { label: "India", value: "india" },
  { label: "Cambodia", value: "cambodia" },
  { label: "China", value: "china" },
  { label: "Vietnam", value: "vietnam" },
];
const africaCountries = [
  { label: "Kenya", value: "kenya" },
  { label: "Nigeria", value: "nigeria" },
  { label: "Egypt", value: "egypt" },
  { label: "South Africa", value: "south_africa" },
  { label: "Ethiopia", value: "ethiopia" },
  { label: "Ghana", value: "ghana" },
];
const americaCountries = [
  { label: "United States", value: "united_states" },
  { label: "Canada", value: "canada" },
  { label: "Brazil", value: "brazil" },
  { label: "Mexico", value: "mexico" },
  { label: "Argentina", value: "argentina" },
  { label: "Chile", value: "chile" },
];
const europeCountries = [
  { label: "Germany", value: "germany" },
  { label: "France", value: "france" },
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "Italy", value: "italy" },
  { label: "Spain", value: "spain" },
  { label: "Netherlands", value: "netherlands" },
];
const australiaCountries = [{ label: "Australia", value: "australia" }];
const countries = {
  asia: asiaCountries,
  africa: africaCountries,
  america: americaCountries,
  europe: europeCountries,
  australia: australiaCountries,
};

type ContinentsType = keyof typeof countries;

const getCorrespondingCountries = (continent: ContinentsType) => {
  return countries[continent] ? countries[continent] : asiaCountries;
};

export {
  ContinentsType,
  continents,
  countries,
  asiaCountries,
  africaCountries,
  americaCountries,
  europeCountries,
  australiaCountries,
  getCorrespondingCountries,
};
