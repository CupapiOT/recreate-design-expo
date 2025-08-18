import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { ReliefPostData, ReliefPosts } from "@/types/relief-tab/ReliefPost";
import { useRoute, RouteProp } from "@react-navigation/native";
import { iconSize, s } from "@/styles/common";
import { getData } from "@/utils/crudStorage";
import { useState, useEffect } from "react";
import NotFound from "@/app/_not_found";
import { getFormattedDay, getFormattedTime } from "@/utils/dateFormat";
import InfoHeader from "@/components/layout/InfoHeader";
import { Card, VariableButton } from "@/components";
import { snakeCaseToTitle } from "@/utils/caseFormat";
import PostInfoText from "@/components/relief-tab/PostInfoText";
import HorizontalLine from "@/components/layout/HorizontalLine";
import BottomSpacing from "@/components/layout/BottomSpacing";
import PriceDetails from "@/components/relief-tab/PriceDetails";
import { Colors } from "@/constants/Themes";
import { LocationPinIconBlack, WhatsappIcon } from "@/constants/CustomIcons";
import { router } from "expo-router";

export default function Post() {
  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const { id } = route.params;
  const [post, setPost] = useState<ReliefPostData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = (await getData("reliefPosts")) as ReliefPosts;
        if (data) {
          const matchingPost = data.find((post) => post.id === Number(id));
          setPost(matchingPost?.data ?? null);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error loading relief post:", error);
        setPost(null);
      }
    };

    loadData();
  }, [id]);

  if (post == null) {
    return <NotFound />;
  }

  return (
    <SafeAreaView style={[s.topContainer]}>
      <InfoHeader
        onBack={() => router.push("/reliefs")}
        title={post.vehicleDetails.brand}
      />
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, s.mainScrollContainer]}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Image style={styles.image} source={{ uri: post.vehiclePhoto }} />
        </Card>
        <Card padding={18}>
          <PostInfoText headingType="title">
            {post.vehicleDetails.brand}
          </PostInfoText>
          <PostInfoText headingType="carModel">
            {post.vehicleDetails.model}
          </PostInfoText>

          <HorizontalLine />

          <PriceDetails
            amount={String(post.price.amount)}
            cdw={post.price.cdw}
          />

          <HorizontalLine />

          <PostInfoText headingType="subtitle">Rent Detail</PostInfoText>
          <PostInfoText headingType="detail">
            {post.rentDetail === "temporaryRelief"
              ? "Temporary"
              : post.rentDetail === "shareVehicle"
                ? "Share"
                : "Take Over"}
          </PostInfoText>

          <HorizontalLine />

          <PostInfoText headingType="subtitle">Location</PostInfoText>
          <PostInfoText
            headingType="detail"
            startIcon={
              <LocationPinIconBlack
                width={iconSize.regular}
                height={iconSize.regular}
              />
            }
          >
            {snakeCaseToTitle(post.preferredLocation.region)},{" "}
            {snakeCaseToTitle(post.preferredLocation.area)}
          </PostInfoText>

          <HorizontalLine />

          <PostInfoText headingType="subtitle">Period</PostInfoText>
          <PostInfoText headingType="detail">
            {getFormattedDay(post.reliefPeriod.collectionDate)} ~{" "}
            {getFormattedDay(post.reliefPeriod.returnDate)}
          </PostInfoText>

          <HorizontalLine />

          <PostInfoText headingType="subtitle">Collection Time</PostInfoText>
          <PostInfoText headingType="detail">
            {getFormattedTime(post.reliefPeriod.collectionTime)} ~{" "}
            {getFormattedTime(post.reliefPeriod.returnTime)}
          </PostInfoText>

          <HorizontalLine color="transparent" />

          <PostInfoText headingType="title">Additional Info</PostInfoText>
          <PostInfoText headingType="description">
            {post.description}
          </PostInfoText>
        </Card>

        <Card padding={18} style={styles.contactContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={require("@/assets/images/profile.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text style={[styles.profileName, s.montserratFontSemiBold]}>
                Jonathan Smith
              </Text>
              <Text style={[styles.profileNumber, s.montserratFontRegular]}>
                +65 82987722
              </Text>
            </View>
          </View>
          <VariableButton
            image={<WhatsappIcon color={Colors.white} />}
            title="Contact WhatsApp"
            style={[styles.contactButton]}
            textStyle={s.montserratFontMedium}
            fontSize={16}
            width="auto"
          />
        </Card>
        <BottomSpacing />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 12,
    maxWidth: 380,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    objectFit: "scale-down",
    borderRadius: 20,
  },

  contactContainer: {
    gap: 16,
  },
  contactButton: {
    backgroundColor: Colors.success,
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileTextContainer: {
    flexDirection: "column",
  },
  profileName: {
    color: Colors.black,
    fontSize: 16,
  },
  profileNumber: {
    color: Colors.text,
    fontSize: 14,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
});
