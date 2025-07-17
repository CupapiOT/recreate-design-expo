const regions = [ 
  {label: "Central", value: "central"},
  {label: "East", value: "east"},
  {label: "North East", value: "north_east"},
  {label: "North", value: "north"},
  {label: "West", value: "west"},
]

const centralAreas = [
  { label: "Bishan", value: "bishan" },
  { label: "Bukit Merah", value: "bukit_merah" },
  { label: "Bukit Timah", value: "bukit_timah" },
  { label: "Downtown Core", value: "downtown_core" },
  { label: "Geylang", value: "geylang" },
  { label: "Kallang", value: "kallang" },
  { label: "Marina East", value: "marina_east" },
  { label: "Marina South", value: "marina_south" },
  { label: "Marine Parade", value: "marine_parade" },
  { label: "Museum", value: "museum" },
  { label: "Newton", value: "newton" },
  { label: "Novena", value: "novena" },
  { label: "Orchard", value: "orchard" },
  { label: "Outram", value: "outram" },
  { label: "Queenstown", value: "queenstown" },
  { label: "River Valley", value: "river_valley" },
  { label: "Rochor", value: "rochor" },
  { label: "Singapore River", value: "singapore_river" },
  { label: "Straits View", value: "straits_view" },
  { label: "Southern Islands", value: "southern_islands" },
];

const eastAreas = [
  { label: "Bedok", value: "bedok" },
  { label: "Changi", value: "changi" },
  { label: "Changi Bay", value: "changi_bay" },
  { label: "Pasir Ris", value: "pasir_ris" },
  { label: "Paya Lebar", value: "paya_lebar" },
  { label: "Tampines", value: "tampines" },
];

const northEastAreas = [
  { label: "Ang Mo Kio", value: "ang_mo_kio" },
  { label: "Hougang", value: "hougang" },
  { label: "North‑Eastern Islands", value: "north_eastern_islands" },
  { label: "Punggol", value: "punggol" },
  { label: "Sengkang", value: "sengkang" },
  { label: "Serangoon", value: "serangoon" },
  { label: "Seletar", value: "seletar" },
];

const northAreas = [
  { label: "Central Water Catchment", value: "central_water_catchment" },
  { label: "Lim Chu Kang", value: "lim_chu_kang" },
  { label: "Mandai", value: "mandai" },
  { label: "Simpang", value: "simpang" },
  { label: "Sembawang", value: "sembawang" },
  { label: "Woodlands", value: "woodlands" },
  { label: "Yishun", value: "yishun" },
];

const westAreas = [
  { label: "Boon Lay", value: "boon_lay" },
  { label: "Bukit Batok", value: "bukit_batok" },
  { label: "Bukit Panjang", value: "bukit_panjang" },
  { label: "Clementi", value: "clementi" },
  { label: "Choa Chu Kang", value: "choa_chu_kang" },
  { label: "Jurong East", value: "jurong_east" },
  { label: "Jurong West", value: "jurong_west" },
  { label: "Tuas West", value: "tuas_west" },
  { label: "Tengah", value: "tengah" },
  { label: "Western Water Catchment", value: "western_water_catchment" },
  { label: "Western Islands", value: "western_islands" },
];

const areas = {
  central: centralAreas,
  east: eastAreas,
  north_east: northEastAreas,
  north: northAreas,
  west: westAreas,
};

type AreasType = keyof typeof areas;

const getCorrespondingAreas = (area: AreasType) => {
  return areas[area] ? areas[area] : areas["central"];
};

export { AreasType, regions, areas, getCorrespondingAreas };
