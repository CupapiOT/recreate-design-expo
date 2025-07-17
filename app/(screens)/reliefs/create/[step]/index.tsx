import { View, Text, StyleSheet } from "react-native";
import InfoHeader from "@/components/layout/InfoHeader";
import { router } from "expo-router";
import { useRoute, RouteProp } from "@react-navigation/native";
import { VariableButton } from "@/components";
import { Colors } from "@/constants/Themes";
import { s } from "@/styles/common";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBarNode from "@/app/(screens)/reliefs/components/ProgressBarNode";
import {
  S1_RentDetail,
  S2_VehicleDetails,
  S3_VehiclePhoto,
  S4_ReliefPeriod,
  S5_Location,
  S6_Price,
  S7_Description,
} from "./steps";
import { getData, setData } from "@/utils/crudStorage";
import { ReliefPosts } from "@/types/ReliefPost";

export default function Steps() {
  const MAX_STEP_COUNT = 7;
  const route = useRoute<RouteProp<{ params: { step: string } }, "params">>();
  const { step: stringStep } = route.params;
  const step = Number(stringStep);
  const ALL_STEPS = [
    <S1_RentDetail key={1} />,
    <S2_VehicleDetails key={2} />,
    <S3_VehiclePhoto key={3} />,
    <S4_ReliefPeriod key={4} />,
    <S5_Location key={5} />,
    <S6_Price key={6} />,
    <S7_Description key={7} />,
  ];

  const progressBar = [];
  for (let i = 0; i < step; i++) {
    progressBar.push(<ProgressBarNode key={i} isActive={true} />);
  }
  for (let i = step; i < MAX_STEP_COUNT; i++) {
    progressBar.push(<ProgressBarNode key={i} isActive={false} />);
  }

  return (
    <SafeAreaView style={s.topContainer}>
      {step <= MAX_STEP_COUNT && (
        <InfoHeader
          paddingBottom={24}
          title="List New Post"
          onBack={() => {
            router.push("/reliefs");
          }}
        />
      )}
      <View style={[s.mainScrollContainer, styles.main]}>
        {step <= MAX_STEP_COUNT && (
          <View style={styles.progressContainer}>
            <View style={[styles.createNewPost]}>
              <Text style={[s.montserratFontMedium]}>Create New Post</Text>
              <Text style={[s.montserratFontMedium, styles.stepCount]}>
                Step {step}/{MAX_STEP_COUNT}
              </Text>
            </View>
            <View style={styles.progressBar}>{progressBar}</View>
          </View>
        )}
        {ALL_STEPS[step - 1]}
      </View>
      <View style={styles.buttonsContainer}>
        {step > 1 && (
          <VariableButton
            textStyle={[styles.moveText, s.montserratFontBold]}
            title={"Back"}
            height={60}
            style={[styles.button, styles.moveButton, styles.backButton]}
            variant="withBackArrow"
            arrowPosition="otherSide"
            onPress={() =>
              router.push({
                pathname: "/reliefs/create/[step]",
                params: { step: step - 1 },
              })
            }
          />
        )}
        <VariableButton
          textStyle={[styles.moveText, s.montserratFontBold]}
          title={"Next"}
          height={60}
          style={[styles.button, styles.moveButton]}
          variant="withArrow"
          arrowPosition="otherSide"
          onPress={async () => {
            // Add post to list of posts.
            if (step === MAX_STEP_COUNT) {
              const newPostData = await getData("reliefPostLocalStore");
              const currPosts = (await getData(
                "reliefPosts",
              )) as ReliefPosts | null;
              const lastUsedID: number = await getData("lastUsedID");
              if (currPosts == null) {
                await setData("lastUsedID", 1);
                await setData("reliefPosts", [{ id: 1, data: newPostData }]);
              } else {
                if (lastUsedID == null) {
                  await setData("lastUsedID", -1); // So that indexing starts at 0.
                }
                const newPostEntry = { id: lastUsedID + 1, data: newPostData };
                await setData("lastUsedID", lastUsedID + 1);
                await setData("reliefPosts", [...currPosts, newPostEntry]);
              }
            }
            router.push({
              pathname:
                step === MAX_STEP_COUNT
                  ? "/reliefs/success"
                  : "/reliefs/create/[step]",
              params: { step: step + 1 },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  progressContainer: {
    rowGap: 16,
    marginBottom: 40,
  },
  createNewPost: {
    columnGap: 12,
    flexDirection: "row",
  },
  stepCount: {
    color: Colors.red,
  },
  progressBar: {
    flexDirection: "row",
    gap: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingInline: 15,
  },
  button: {
    flex: 1,
  },
  backButton: {
    backgroundColor: Colors.grey,
  },
  moveButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
  },
  backToHomeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  moveText: {
    fontSize: 18,
  },
});
