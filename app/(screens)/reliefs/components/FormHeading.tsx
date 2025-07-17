import { GradientText } from "@/components";
import { StyleSheet, Text } from "react-native";
import { s } from "@/styles/common";

type FormTitleProps = {
  text: string;
  headingNumber?: number;
  textAlign?: "left" | "center" | "right";
};

export default function FormHeading({
  text,
  headingNumber = 1,
  textAlign = "left",
}: FormTitleProps) {
  let button;

  switch (headingNumber) {
    case 1:
      button = (
        <GradientText
          textStyles={[
            styles.title,
            s.montserratFontSemiBold,
            { textAlign: textAlign },
          ]}
          text={text}
        />
      );
      break;
    case 2:
      button = (
        <Text
          style={[
            s.montserratFontSemiBold,
            styles.subtitle,
            { textAlign: textAlign },
          ]}
        >
          {text}
        </Text>
      );
      break;
  }
  return button;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 20,
  },
});
