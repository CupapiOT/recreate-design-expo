export const imageMap = {
  // Images
  carwash: require("../assets/images/carwash.jpeg"),

  // // Logos (uncomment when images available)
  // bmw: require("../assets/images/bmw-logo.png"),
  // audi: require("../assets/images/audi-logo.png"),
  // ford: require("../assets/images/ford-logo.png"),
  // nissan: require("../assets/images/nissan-logo.png"),
  chevrolet: require("../assets/images/super-chevrolet.png"),
  bosch: require("../assets/images/bosch-service.png"),
} as const;

export type ImageKey = keyof typeof imageMap;
