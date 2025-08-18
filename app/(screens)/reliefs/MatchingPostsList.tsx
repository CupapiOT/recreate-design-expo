import { ReliefPostCard } from "@/components/relief-tab";
import { ReliefPosts } from "@/types/relief-tab/ReliefPost";
import { snakeCaseToTitle } from "@/utils/caseFormat";
import { getFormattedDay, getFormattedTime } from "@/utils/dateFormat";

export default function MatchingPostsList({
  matchingPosts,
}: {
  matchingPosts: ReliefPosts;
}) {
  return (
    <>
      {matchingPosts.map(({ id, data }) => {
        const location =
          `${snakeCaseToTitle(data.preferredLocation.region)}, ` +
          `${snakeCaseToTitle(data.preferredLocation.area)}`;
        return (
          <ReliefPostCard
            key={id}
            id={Number(id)}
            location={location}
            rentDetail={data.rentDetail}
            vehicleDetails={{
              brand: data.vehicleDetails.brand,
              model: data.vehicleDetails.model,
            }}
            vehiclePhoto={data.vehiclePhoto}
            reliefPeriod={{
              collectionDate: getFormattedDay(data.reliefPeriod.collectionDate),
              collectionTime: getFormattedTime(
                data.reliefPeriod.collectionTime,
              ),
              returnDate: getFormattedDay(data.reliefPeriod.returnDate),
              returnTime: getFormattedTime(data.reliefPeriod.returnTime),
            }}
            price={{
              amount: Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
                maximumFractionDigits: 2,
              }).format(data.price.amount),
              cdw: data.price.cdw,
            }}
          />
        );
      })}
    </>
  );
}
