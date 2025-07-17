import { ImageKey } from "@/constants/ImageMap";

export type Promo = {
  id: string;
  title: string;
  description: string;
  image: ImageKey;
  discount: string;
  info: string;
  howToUse: string;
  termCondition: string;
  cancellationPolicy: string;
  logoService: ImageKey;
};
