import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { iconSize, s } from "@/styles/common";
import Navbar from "@/components/layout/Navbar";
import { VariableButton, Card, TextField } from "@/components";
import { router } from "expo-router";
import BottomSpacing from "@/components/layout/BottomSpacing";
import ScreenHeader from "@/components/layout/ScreenHeader";
import HorizontalLine from "@/components/layout/HorizontalLine";
import {
  CarGradientIcon,
  FilterGradientIcon,
  SearchGradientIcon,
} from "@/constants/CustomIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "@/utils/crudStorage";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
  IAutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";
import { ReactNode, useEffect, useState, useRef, RefObject } from "react";
import { Colors } from "@/constants/Themes";
import { useReliefPostQuery } from "@/hooks/relief-tab/useFilterAndSort";
import { updateStateObject } from "@/utils/updateStateObject";
import PressableInput from "@/components/relief-tab/PressableInput";
import { ReliefPosts } from "@/types/relief-tab/ReliefPost";
import {
  ReliefPostsSortBy,
  sortByDropdownType,
  sortByDropdownData,
} from "@/types/relief-tab/ReliefFilters";
import { AreasType } from "@/constants/singaporeLocations";
import { snakeCaseToTitle } from "@/utils/caseFormat";
import { pickDateTime } from "@/utils/pickDateTime";
import { getFormattedDay, getFormattedTime } from "@/utils/dateFormat";
import MatchingPostsList from "./MatchingPostsList";

export default function ReliefScreen() {
  const startPostCreation = async () => {
    try {
      await AsyncStorage.removeItem("reliefPostLocalStore");
    } catch (error) {
      console.error("Error clearing form data:", error);
    }
    router.push({
      pathname: "/reliefs/create/[step]",
      params: { step: 1 },
    });
  };

  const [allPosts, setAllPosts] = useState<ReliefPosts | null>(null);

  useEffect(() => {
    const loadAllPostsData = async () => {
      try {
        const data = await getData("reliefPosts");
        setAllPosts(data);
        setMatchingPosts(data.slice().reverse());
      } catch (error) {
        console.error("Error retrieving all posts' data:", error);
      }
    };
    loadAllPostsData();
  }, []);

  const getLocationData = (
    rawLocation: string,
  ): { region: AreasType; area: string } | null => {
    // Set up and match Regex.
    const formattedLocation = rawLocation.toLowerCase();
    const regionRegex = /^.*, /;
    const areaRegex = /, .*$/;
    const matchedRegion = formattedLocation.match(regionRegex);
    const matchedArea = formattedLocation.match(areaRegex);
    if (matchedRegion == null || matchedArea == null) {
      return null;
    }
    // Return both if successful.
    const region = matchedRegion[0]
      .slice(0, -2)
      .replaceAll(" ", "_") as AreasType;
    const area = matchedArea[0].slice(2).replaceAll(" ", "_");
    return { region, area };
  };

  const [matchingPosts, setMatchingPosts] = useState<ReliefPosts | null>(
    allPosts,
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const onSearchLocation = (location: string) => {
    setSelectedLocation(location);
    const locationData = getLocationData(location);
    if (matchingPosts == null || locationData == null) {
      return null;
    }
    // Find posts with this location.
    setMatchingPosts(filterAndSortPosts(matchingPosts));
    const matchedPosts = matchingPosts.filter(
      (post) =>
        post.data.preferredLocation.region === locationData.region &&
        post.data.preferredLocation.area === locationData.area,
    );
    if (matchedPosts) {
      setMatchingPosts(matchedPosts);
    }
  };

  let searchBox: ReactNode;
  const availableBrands: {
    id: string;
    title: string;
  }[] = [];
  if (allPosts == null) {
    searchBox = (
      <Text
        style={[
          s.montserratFontRegular,
          styles.searchDropdownItem,
          styles.noPostsText,
        ]}
      >
        No posts yet, sorry!
      </Text>
    );
  } else {
    // Extract data from ReliefPosts for the location-dropdown.
    const locationDropdownData: { id: string; title: string }[] = [];
    for (const post of allPosts) {
      const postLocation =
        `${snakeCaseToTitle(post.data.preferredLocation.region)}, ` +
        `${snakeCaseToTitle(post.data.preferredLocation.area)}`;
      locationDropdownData.push({
        id: String(post.id),
        title: postLocation,
      });
    }
    searchBox = (
      <AutocompleteDropdown
        showChevron={false}
        dataSet={locationDropdownData}
        inputContainerStyle={styles.backgroundWhite}
        containerStyle={scStyles.searchField}
        onClear={() => setMatchingPosts(filterAndSortPosts(allPosts))}
        onSelectItem={(location) =>
          location?.title && onSearchLocation(location.title)
        }
        textInputProps={{
          placeholder: "Search locations...",
          style: [styles.backgroundWhite, s.montserratFontRegular],
        }}
        renderItem={(location) => (
          <Text
            key={location.id}
            style={[s.montserratFontRegular, styles.searchDropdownItem]}
          >
            {location.title}
          </Text>
        )}
      />
    );

    // Brand dropdown.
    for (const post of allPosts) {
      let dupeBrand = false;
      for (const brand of availableBrands) {
        if (brand.id === post.data.vehicleDetails.brand) {
          dupeBrand = true;
          break;
        }
      }
      if (dupeBrand) continue;
      availableBrands.push({
        id: post.data.vehicleDetails.brand,
        title: post.data.vehicleDetails.brand,
      });
    }
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filters, sortBy, filterAndSortPosts } = useReliefPostQuery();

  const saveFilters = () => {
    if (allPosts == null) {
      console.warn("Could not create dataset because `allPosts` is null.");
      return;
    }
    setMatchingPosts(filterAndSortPosts(allPosts));
    setIsFilterOpen(false);
  };

  // Functions to change filters.
  //   Date and Time ranges
  const onSelectDateFrom = (_: any, newDate: Date | null) =>
    updateStateObject("dateFrom", newDate ?? new Date(), filters.set);
  const onSelectDateTo = (_: any, newDate: Date | null) =>
    updateStateObject("dateTo", newDate ?? new Date(), filters.set);
  const onSelectTimeFrom = (_: any, newTime: Date | null) =>
    updateStateObject("timeFrom", newTime ?? new Date(), filters.set);
  const onSelectTimeTo = (_: any, newTime: Date | null) =>
    updateStateObject("timeTo", newTime ?? new Date(), filters.set);
  //   Price range
  const onChangePriceFrom = (amount: number) =>
    updateStateObject("priceFrom", amount, filters.set);
  const onChangePriceTo = (amount: number) =>
    updateStateObject("priceTo", amount, filters.set);
  //   Brand name
  const onSelectBrand = (name: string | null) =>
    updateStateObject("brand", name, filters.set);

  // Functions and refs to change sortBy.
  /**
   * Sets the selected `key` to `option`, and sets every other key to `null`.
   */
  const timePostedDropdownController = useRef<IAutocompleteDropdownRef>(null);
  const priceDropdownController = useRef<IAutocompleteDropdownRef>(null);
  const durationDropdownController = useRef<IAutocompleteDropdownRef>(null);
  const sortByDropdowns: {
    [K in keyof ReliefPostsSortBy]: RefObject<IAutocompleteDropdownRef | null>;
  } = {
    timePosted: timePostedDropdownController,
    price: priceDropdownController,
    duration: durationDropdownController,
  };
  const onSortBy = <sortingType extends keyof ReliefPostsSortBy>(
    sortType: sortingType,
    option: ReliefPostsSortBy[sortingType],
  ) => {
    Object.keys(sortBy.values).forEach((type) => {
      if (type !== sortType) {
        sortByDropdowns[type as sortingType].current?.clear();
      }
      updateStateObject(
        type as sortingType,
        type === sortType ? option : null,
        sortBy.set,
      );
    });
  };

  return (
    <SafeAreaView style={s.topContainer}>
      <ScreenHeader img={CarGradientIcon} title={"Relief Driver"} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.container,
            matchingPosts?.length ? { width: "96%" } : { width: "100%" },
          ]}
        >
          <VariableButton
            title="List your vehicle now"
            variant="withArrow"
            onPress={startPostCreation}
          />
          <View style={[scStyles.top]}>
            <Card
              padding={4}
              style={[
                scStyles.searchBar,
                allPosts ? {} : { paddingRight: 12, marginRight: 12 },
              ]}
            >
              {searchBox}
              <SearchGradientIcon
                width={iconSize.medium}
                height={iconSize.medium}
              />
            </Card>
            <VariableButton
              style={scStyles.openFilterButton}
              variant="action"
              image={
                <FilterGradientIcon
                  width={iconSize.medium}
                  height={iconSize.medium}
                />
              }
              onPress={() => setIsFilterOpen(true)}
            />
          </View>
          <Modal animationType="fade" visible={isFilterOpen} transparent>
            <View style={[modalStyles.modal]}>
              <View style={[modalStyles.options]}>
                <View style={[modalStyles.subOptions]}>
                  <Text style={[modalStyles.modalTitle, s.montserratFontBold]}>
                    Filters
                  </Text>
                  <View style={[modalStyles.topRanges]}>
                    <View style={[modalStyles.filterTextColumn]}>
                      <Text style={[s.montserratFontSemiBold]}>Date</Text>
                      <Text style={[s.montserratFontSemiBold]}>Time</Text>
                      <Text style={[s.montserratFontSemiBold]}>Price</Text>
                    </View>
                    <View style={modalStyles.filterRanges}>
                      <View style={[modalStyles.inputColumn]}>
                        <PressableInput
                          value={
                            filters.values.dateFrom
                              ? getFormattedDay(
                                  filters.values.dateFrom,
                                  false,
                                  true,
                                )
                              : "..."
                          }
                          onPress={() =>
                            pickDateTime(
                              filters.values.dateFrom,
                              "date",
                              onSelectDateFrom,
                            )
                          }
                          style={[modalStyles.pressableInput]}
                          textStyle={[modalStyles.pressableInputText]}
                        />
                        <PressableInput
                          value={
                            filters.values.timeFrom
                              ? getFormattedTime(filters.values.timeFrom)
                              : "..."
                          }
                          onPress={() =>
                            pickDateTime(
                              filters.values.timeFrom,
                              "time",
                              onSelectTimeFrom,
                            )
                          }
                          style={[modalStyles.pressableInput]}
                          textStyle={[modalStyles.pressableInputText]}
                        />
                        <TextField
                          placeholder="..."
                          style={modalStyles.pressableInput}
                          inputStyle={modalStyles.pressableInputText}
                          type="number"
                          value={
                            filters.values.priceFrom
                              ? String(filters.values.priceFrom)
                              : ""
                          }
                          onChange={(price) => onChangePriceFrom(Number(price))}
                        />
                      </View>
                      <View style={[modalStyles.filterTextColumn]}>
                        <Text style={[s.montserratFontSemiBold]}>to</Text>
                        <Text style={[s.montserratFontSemiBold]}>to</Text>
                        <Text style={[s.montserratFontSemiBold]}>to</Text>
                      </View>
                      <View style={[modalStyles.inputColumn]}>
                        <PressableInput
                          value={
                            filters.values.dateTo
                              ? getFormattedDay(
                                  filters.values.dateTo,
                                  false,
                                  true,
                                )
                              : "..."
                          }
                          onPress={() =>
                            pickDateTime(
                              filters.values.dateTo,
                              "date",
                              onSelectDateTo,
                              filters.values.dateFrom,
                            )
                          }
                          style={[modalStyles.pressableInput]}
                          textStyle={[modalStyles.pressableInputText]}
                        />
                        <PressableInput
                          value={
                            filters.values.timeTo
                              ? getFormattedTime(filters.values.timeTo)
                              : "..."
                          }
                          onPress={() =>
                            pickDateTime(
                              filters.values.timeTo,
                              "time",
                              onSelectTimeTo,
                            )
                          }
                          style={[modalStyles.pressableInput]}
                          textStyle={[modalStyles.pressableInputText]}
                        />
                        <TextField
                          placeholder="..."
                          style={modalStyles.pressableInput}
                          inputStyle={modalStyles.pressableInputText}
                          type="number"
                          value={
                            filters.values.priceTo
                              ? String(filters.values.priceTo)
                              : ""
                          }
                          onChange={(price) => onChangePriceTo(Number(price))}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[modalStyles.topBrandRange, { marginTop: 2 }]}>
                    <Text style={[s.montserratFontSemiBold]}>Brand</Text>
                    <AutocompleteDropdownContextProvider>
                      <View style={modalStyles.filterBrandRange}>
                        {allPosts && (
                          <AutocompleteDropdown
                            initialValue={filters.values.brand ?? "..."}
                            inputContainerStyle={styles.backgroundWhite}
                            containerStyle={modalStyles.sortByDropdown}
                            dataSet={availableBrands}
                            onSelectItem={(brand) =>
                              brand?.id && onSelectBrand(brand.id)
                            }
                            onClear={() => onSelectBrand(null)}
                            renderItem={(location) => (
                              <Text
                                key={location.id}
                                style={[
                                  s.montserratFontRegular,
                                  modalStyles.brandDropdownItem,
                                ]}
                              >
                                {location.title}
                              </Text>
                            )}
                            textInputProps={{
                              placeholder: "Name",
                              style: [
                                styles.backgroundWhite,
                                s.montserratFontRegular,
                                modalStyles.brandDropdownItem,
                              ],
                            }}
                          />
                        )}
                      </View>
                    </AutocompleteDropdownContextProvider>
                  </View>
                </View>
                <HorizontalLine />
                <View style={[modalStyles.subOptions]}>
                  <Text style={[modalStyles.modalTitle, s.montserratFontBold]}>
                    Sort By
                  </Text>
                  <View style={[modalStyles.topRanges]}>
                    <View style={[modalStyles.sortByTextColumn]}>
                      <Text style={[s.montserratFontSemiBold]}>Posted</Text>
                      <Text style={[s.montserratFontSemiBold]}>Price</Text>
                      <Text style={[s.montserratFontSemiBold]}>Duration</Text>
                    </View>
                    <AutocompleteDropdownContextProvider>
                      <View style={modalStyles.sortByRanges}>
                        <AutocompleteDropdown
                          controller={timePostedDropdownController}
                          renderItem={(timePostedItem) => (
                            <Text
                              style={[
                                s.montserratFontRegular,
                                modalStyles.sortByDropdownListItem,
                              ]}
                            >
                              {timePostedItem.title}
                            </Text>
                          )}
                          dataSet={sortByDropdownData.timePosted}
                          onSelectItem={(timePostedItem) =>
                            timePostedItem &&
                            onSortBy(
                              "timePosted",
                              timePostedItem.id as sortByDropdownType<"timePosted">[number]["id"], // Typescript complains here.
                            )
                          }
                          initialValue={sortBy.values.timePosted ?? "..."}
                          textInputProps={{
                            style: [
                              modalStyles.sortByDropdownText,
                              s.montserratFontRegular,
                            ],
                          }}
                          inputContainerStyle={modalStyles.sortByDropdown}
                        />
                        <AutocompleteDropdown
                          controller={priceDropdownController}
                          renderItem={(priceItem) => (
                            <Text
                              style={[
                                s.montserratFontRegular,
                                modalStyles.sortByDropdownListItem,
                              ]}
                            >
                              {priceItem.title}
                            </Text>
                          )}
                          dataSet={sortByDropdownData.price}
                          onSelectItem={(priceItem: any) =>
                            priceItem &&
                            onSortBy(
                              "price",
                              priceItem.id
                            )
                          }
                          initialValue={sortBy.values.price ?? "..."}
                          textInputProps={{
                            style: [
                              modalStyles.sortByDropdownText,
                              s.montserratFontRegular,
                            ],
                          }}
                          inputContainerStyle={modalStyles.sortByDropdown}
                        />
                        <AutocompleteDropdown
                          controller={durationDropdownController}
                          renderItem={(durationItem) => (
                            <Text
                              style={[
                                s.montserratFontRegular,
                                modalStyles.sortByDropdownListItem,
                              ]}
                            >
                              {durationItem.title}
                            </Text>
                          )}
                          dataSet={sortByDropdownData.duration}
                          onSelectItem={(durationItem: any) =>
                            durationItem &&
                            onSortBy(
                              "duration",
                              durationItem.id
                            )
                          }
                          initialValue={sortBy.values.duration ?? "..."}
                          textInputProps={{
                            style: [
                              modalStyles.sortByDropdownText,
                              s.montserratFontRegular,
                            ],
                          }}
                          inputContainerStyle={modalStyles.sortByDropdown}
                        />
                      </View>
                    </AutocompleteDropdownContextProvider>
                  </View>
                </View>
                <VariableButton
                  title="Save Changes"
                  onPress={() => saveFilters()}
                  width="100%"
                />
                <Pressable onPress={() => saveFilters()}></Pressable>
              </View>
            </View>
          </Modal>
          <Text style={[styles.foundText, s.montserratFontMedium]}>
            Found{"  "}
            <Text style={[styles.foundResultsText, s.montserratFontMedium]}>
              {matchingPosts
                ? `${matchingPosts.length} Result${matchingPosts.length !== 1 ? "s" : ""}`
                : "0 Results"}
            </Text>
          </Text>
        </View>
        {matchingPosts && <MatchingPostsList matchingPosts={matchingPosts} />}
        <BottomSpacing height={150} />
      </ScrollView>
      <Navbar whichSelected="relief" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    gap: 12,
  },
  container: {
    justifyContent: "center",
    gap: 12,
  },
  backgroundWhite: {
    backgroundColor: Colors.white,
  },
  noPostsText: {
    flex: 1,
  },

  searchDropdownItem: {
    fontSize: 16,
    padding: 8,
  },

  foundText: {
    paddingBlock: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  foundResultsText: {
    fontSize: 16,
    color: Colors.red,
  },
});

/**
 * `sc` stands for `searchContainer`
 * This set of styles are ALL containers related to the search and filter feature of the relief screen.
 */
const scStyles = StyleSheet.create({
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchBar: {
    paddingLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 320,
  },
  searchField: {
    width: 250,
  },
  openFilterButton: {
    width: 55,
    aspectRatio: 1 / 1,
  },
});

const modalStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  options: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    width: 380,
    height: 500,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subOptions: {
    alignItems: "center",
  },
  pressableInput: {
    width: 120,
    height: 15,
    padding: 0,
    margin: 0,
  },
  topRanges: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 1,
  },
  filterRanges: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  topBrandRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 1,
  },
  filterBrandRange: {
    left: 24,
    width: "91.75%",
  },
  brandDropdownItem: {
    fontSize: 14,
    padding: 6,
  },

  sortByRanges: {
    flexDirection: "column",
    width: "100%",
  },
  sortByDropdownListItem: {
    fontSize: 14,
    padding: 8,
  },
  sortByDropdown: {
    backgroundColor: Colors.white,
  },
  sortByDropdownText: {
    fontSize: 14,
  },
  sortByTextColumn: {
    rowGap: 15,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  filterTextColumn: {
    rowGap: 4,
  },
  inputColumn: {
    rowGap: 12,
  },
  pressableInputText: {
    fontSize: 14,
  },
  longPressableInput: {
    marginTop: 2,
    width: "100%",
    height: 15,
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
  },
});
