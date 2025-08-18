import { useState } from "react";
import { ReliefPosts } from "@/types/relief-tab/ReliefPost";
import {
  ReliefPostsFilters,
  defaultReliefPostsFilters,
  ReliefPostsSortBy,
  defaultReliefPostsSortBy,
} from "@/types/relief-tab/ReliefFilters";

function createSortByComparators() {
  const priceComparators = {
    lowestFirst: (a: ReliefPosts[number], b: ReliefPosts[number]) =>
      a.data.price.amount - b.data.price.amount,
    highestFirst: (a: ReliefPosts[number], b: ReliefPosts[number]) =>
      b.data.price.amount - a.data.price.amount,
  };

  const durationComparators = {
    shortestFirst: (a: ReliefPosts[number], b: ReliefPosts[number]) => {
      // Millisecond (Converted) Dates
      const msDates = {
        // We do this manual conversion because the dates are actually strings.
        aCollectionDate: new Date(a.data.reliefPeriod.collectionDate).valueOf(),
        aReturnDate: new Date(a.data.reliefPeriod.returnDate).valueOf(),
        bCollectionDate: new Date(b.data.reliefPeriod.collectionDate).valueOf(),
        bReturnDate: new Date(b.data.reliefPeriod.returnDate).valueOf(),
      };
      const dateDiff =
        msDates.bCollectionDate -
        msDates.bReturnDate -
        (msDates.aCollectionDate - msDates.aReturnDate);
      return dateDiff;
    },
    longestFirst: (a: ReliefPosts[number], b: ReliefPosts[number]) => {
      const msDates = {
        aCollectionDate: new Date(a.data.reliefPeriod.collectionDate).valueOf(),
        aReturnDate: new Date(a.data.reliefPeriod.returnDate).valueOf(),
        bCollectionDate: new Date(b.data.reliefPeriod.collectionDate).valueOf(),
        bReturnDate: new Date(b.data.reliefPeriod.returnDate).valueOf(),
      };
      const reverseDateDiff =
        msDates.aCollectionDate -
        msDates.aReturnDate -
        (msDates.bCollectionDate - msDates.bReturnDate);
      return reverseDateDiff;
    },
  };

  return { priceComparators, durationComparators };
}

function createFilters(filters: ReliefPostsFilters) {
  const filterDateFrom = (post: ReliefPosts[number]) => {
    if (filters.dateFrom == null) return true;
    const postDateFrom = new Date(
      post.data.reliefPeriod.collectionDate,
    ).valueOf();
    const filterDateFrom = new Date(filters.dateFrom).valueOf();
    return postDateFrom >= filterDateFrom;
  };
  const filterDateTo = (post: ReliefPosts[number]) => {
    if (filters.dateTo == null) return true;
    const postDateTo = new Date(post.data.reliefPeriod.returnDate).valueOf();
    const filterDateTo = new Date(filters.dateTo).valueOf();
    return postDateTo <= filterDateTo;
  };

  const filterTimeFrom = (post: ReliefPosts[number]) => {
    if (filters.timeFrom == null) return true;
    const postTimeFrom = new Date(
      post.data.reliefPeriod.collectionTime,
    ).getTime();
    const filterTimeFrom = new Date(filters.timeFrom).getTime();
    return postTimeFrom >= filterTimeFrom;
  };
const filterTimeTo = (post: ReliefPosts[number]) => {
    if (filters.timeTo == null) return true;
    const postTimeTo = new Date(post.data.reliefPeriod.returnTime).valueOf();
    const filterTimeTo = new Date(filters.timeTo).valueOf();
    return postTimeTo <= filterTimeTo;
  };

  const filterPriceFrom = (post: ReliefPosts[number]) => {
    if (filters.priceFrom == null) return true;
    return post.data.price.amount >= filters.priceFrom;
  };
  const filterPriceTo = (post: ReliefPosts[number]) => {
    if (filters.priceTo == null) return true;
    return post.data.price.amount <= filters.priceTo;
  };

  const filterBrand = (post: ReliefPosts[number]) => {
    if (filters.brand == null) return true;
    return post.data.vehicleDetails.brand === filters.brand;
  };

  return {
    dateFrom: filterDateFrom,
    dateTo: filterDateTo,
    timeFrom: filterTimeFrom,
    timeTo: filterTimeTo,
    priceFrom: filterPriceFrom,
    priceTo: filterPriceTo,
    brand: filterBrand,
  };
}

function useReliefPostQuery() {
  const [filters, setFilters] = useState<ReliefPostsFilters>(
    defaultReliefPostsFilters,
  );
  const resetFilters = () => {
    setFilters(defaultReliefPostsFilters);
  };

  const [sortBy, setSortBy] = useState<ReliefPostsSortBy>(
    defaultReliefPostsSortBy,
  );
  const resetSortBy = () => {
    setSortBy(defaultReliefPostsSortBy);
  };

  /**
   * NOTE: Each of these values are mutually exclusive from each other.
   */
  const compileSortBy = (allPosts: ReliefPosts) => {
    const { priceComparators, durationComparators } = createSortByComparators();
    if (sortBy.price != null)
      return [...allPosts].sort(priceComparators[sortBy.price]);
    if (sortBy.duration != null)
      return [...allPosts].sort(durationComparators[sortBy.duration]);
    if (sortBy.timePosted === "newestFirst") return [...allPosts].reverse();
    return allPosts; // Default if none matches.
  };

  const compileFilters = (sortedPosts: ReliefPosts) => {
    const { dateFrom, dateTo, timeFrom, timeTo, priceFrom, priceTo, brand } =
      createFilters(filters);
    const matchesAllFilters = (post: ReliefPosts[number]) =>
      dateFrom(post) &&
      dateTo(post) &&
      timeFrom(post) &&
      timeTo(post) &&
      priceFrom(post) &&
      priceTo(post) &&
      brand(post);
    return sortedPosts.filter((post) => matchesAllFilters(post));

    // return sortedPosts
    //   .filter(dateFrom)
    //   .filter(dateTo)
    //   .filter(timeFrom)
    //   .filter(timeTo)
    //   .filter(priceFrom)
    //   .filter(priceTo)
    //   .filter(brand);
  };

  const filterAndSortPosts = (allPosts: ReliefPosts) => {
    return compileFilters(compileSortBy(allPosts));
  };

  return {
    filters: { values: filters, set: setFilters, reset: resetFilters },
    sortBy: { values: sortBy, set: setSortBy, reset: resetSortBy },
    filterAndSortPosts,
  };
}

export { useReliefPostQuery };
