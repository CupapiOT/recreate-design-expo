const regions = [
  { title: "Central", id: "central" },
  { title: "East", id: "east" },
  { title: "North East", id: "north_east" },
  { title: "North", id: "north" },
  { title: "West", id: "west" },
];

const centralAreas = [
  { title: "Bishan", id: "bishan" },
  { title: "Bukit Merah", id: "bukit_merah" },
  { title: "Bukit Timah", id: "bukit_timah" },
  { title: "Downtown Core", id: "downtown_core" },
  { title: "Geylang", id: "geylang" },
  { title: "Kallang", id: "kallang" },
  { title: "Marina East", id: "marina_east" },
  { title: "Marina South", id: "marina_south" },
  { title: "Marine Parade", id: "marine_parade" },
  { title: "Museum", id: "museum" },
  { title: "Newton", id: "newton" },
  { title: "Novena", id: "novena" },
  { title: "Orchard", id: "orchard" },
  { title: "Outram", id: "outram" },
  { title: "Queenstown", id: "queenstown" },
  { title: "River Valley", id: "river_valley" },
  { title: "Rochor", id: "rochor" },
  { title: "Singapore River", id: "singapore_river" },
  { title: "Straits View", id: "straits_view" },
  { title: "Southern Islands", id: "southern_islands" },
];

const eastAreas = [
  { title: "Bedok", id: "bedok" },
  { title: "Changi", id: "changi" },
  { title: "Changi Bay", id: "changi_bay" },
  { title: "Pasir Ris", id: "pasir_ris" },
  { title: "Paya Lebar", id: "paya_lebar" },
  { title: "Tampines", id: "tampines" },
];

const northEastAreas = [
  { title: "Ang Mo Kio", id: "ang_mo_kio" },
  { title: "Hougang", id: "hougang" },
  { title: "North‑Eastern Islands", id: "north_eastern_islands" },
  { title: "Punggol", id: "punggol" },
  { title: "Sengkang", id: "sengkang" },
  { title: "Serangoon", id: "serangoon" },
  { title: "Seletar", id: "seletar" },
];

const northAreas = [
  { title: "Central Water Catchment", id: "central_water_catchment" },
  { title: "Lim Chu Kang", id: "lim_chu_kang" },
  { title: "Mandai", id: "mandai" },
  { title: "Simpang", id: "simpang" },
  { title: "Sembawang", id: "sembawang" },
  { title: "Woodlands", id: "woodlands" },
  { title: "Yishun", id: "yishun" },
];

const westAreas = [
  { title: "Boon Lay", id: "boon_lay" },
  { title: "Bukit Batok", id: "bukit_batok" },
  { title: "Bukit Panjang", id: "bukit_panjang" },
  { title: "Clementi", id: "clementi" },
  { title: "Choa Chu Kang", id: "choa_chu_kang" },
  { title: "Jurong East", id: "jurong_east" },
  { title: "Jurong West", id: "jurong_west" },
  { title: "Tuas West", id: "tuas_west" },
  { title: "Tengah", id: "tengah" },
  { title: "Western Water Catchment", id: "western_water_catchment" },
  { title: "Western Islands", id: "western_islands" },
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
