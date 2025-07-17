import { Text, StyleSheet } from "react-native";
import { s } from "@/styles/common";
import { Colors } from "@/constants/Themes";
import TextWithLink from "./TextWithLink";
import Card from "./Card";
import { LinkProps } from "expo-router";

type InfoCardProps = {
  title: string;
  desc: string;
  href?: LinkProps["href"];
};

export default function InfoCard({ title, desc, href }: InfoCardProps) {
  return (
    <Card style={styles.container} padding={24}>
      <TextWithLink
        textStyles={[styles.titleText, s.montserratFontSemiBold]}
        text={title}
        linkStyles={[styles.linkText, s.montserratFontMedium]}
        variant="separated"
        linkHasArrow={true}
        {...(href && { href: href, linkText: "Learn more" })}
      />
      <Text style={[styles.descText, s.montserratFontRegular]}>{desc}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  titleText: {
    fontSize: 16,
    color: Colors.accent,
  },
  linkText: {
    fontSize: 14,
    color: Colors.accent,
  },
  descText: {
    fontSize: 14,
    color: Colors.black,
  },
});
