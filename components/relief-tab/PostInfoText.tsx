import { View, Text, StyleSheet } from "react-native";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import { ReactNode } from "react";

type PostInfoTextProps = {
  headingType?: "title" | "subtitle" | "detail" | "description" | "carModel" | "tag";
  children?: ReactNode;
  startIcon?: ReactNode;
};

export default function PostInfoText({
  headingType = "detail",
  children,
  startIcon,
}: PostInfoTextProps) {
  const headingStyles = {
    title: [styles.title, s.montserratFontSemiBold],
    subtitle: [styles.subtitle, s.montserratFontMedium],
    detail: [styles.detail, s.montserratFontMedium],
    description: [styles.detail, s.montserratFontRegular],
    carModel: [styles.description, s.montserratFontRegular],
    tag: [styles.tag, s.montserratFontRegular]
  };
  return (
    <>
      {startIcon ? (
        <View style={styles.container}>
          {startIcon}
          <Text style={headingStyles[headingType]}>{children}</Text>
        </View>
      ) : (
        <Text style={headingStyles[headingType]}>{children}</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  title: {
    fontSize: 20,
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    color: Colors.black,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
  },
  tag: {
    alignSelf: "flex-start",
    padding: 2,
    fontSize: 12,
    backgroundColor: Colors.darkSilver,
    paddingHorizontal: 24,
    borderRadius: 9999,
  }
});
