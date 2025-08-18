import { AreasType } from "@/constants/singaporeLocations";

type ReliefPostData = {
  rentDetail: "temporaryRelief" | "takeOverContract" | "shareVehicle";
  vehicleDetails: {
    brand: string;
    model: string;
    plate: string;
  };
  vehiclePhoto: string;
  reliefPeriod: {
    collectionDate: Date;
    collectionTime: Date;
    returnDate: Date;
    returnTime: Date;
  };
  preferredLocation: {
    region: AreasType;
    area: string;
  };
  price: {
    amount: number;
    cdw: "include" | "exclude";
  };
  description: string;
};

type ReliefPosts = { id: number; data: ReliefPostData }[];

export { ReliefPostData, ReliefPosts };
