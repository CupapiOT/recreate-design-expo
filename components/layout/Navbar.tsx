import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { s } from "@/styles/common";
import NavbarButton from "./NavbarButton";
import { VariableButton } from "@/components";
import {
  HomeIcon,
  HomeGradientIcon,
  CarIcon,
  CarGradientIcon,
  JobIcon,
  JobGradientIcon,
  ProfileIcon,
  ProfileGradientIcon,
  DriversSGIcon,
} from "@/constants/CustomIcons";
import { Colors } from "@/constants/Themes";

type NavbarProps = {
  whichSelected: "home" | "relief" | "jobs" | "profile";
};

export default function Navbar({ whichSelected }: NavbarProps) {
  return (
    <View style={styles.container}>
      <NavbarButton
        imgNormal={HomeIcon}
        imgSelected={HomeGradientIcon}
        title="Home"
        URL={"/"}
        isSelected={whichSelected === "home"}
      />
      <NavbarButton
        imgNormal={CarIcon}
        imgSelected={CarGradientIcon}
        title="Relief Driver"
        URL={"/reliefs"}
        isSelected={whichSelected === "relief"}
      />
      <View style={styles.scanContainer}>
        <VariableButton
          variant="gradient"
          style={styles.scanButton}
          width={84}
          height={60}
          image={<DriversSGIcon width={29.4} height={32} />}
          borderStyle={styles.scanButtonBorders}
        />
        <Text style={[styles.driversSGText, s.montserratFontRegular]}>
          drivers.sg
        </Text>
      </View>
      <NavbarButton
        imgNormal={JobIcon}
        imgSelected={JobGradientIcon}
        title="Jobs / Trips"
        URL={"/login"}
        isSelected={whichSelected === "jobs"}
      />
      <NavbarButton
        imgNormal={ProfileIcon}
        imgSelected={ProfileGradientIcon}
        title="Profile"
        URL={"/login"}
        isSelected={whichSelected === "profile"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 30,
    paddingInline: 12,
    zIndex: 998,
    backgroundColor: Colors.white,
  },
  scanContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    position: "absolute",
    bottom: 10,
  },
  scanButtonBorders: {
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: Colors.white,
    borderRadius: 20,
  },
  driversSGText: {
    color: Colors.grey,
    position: "relative",
    top: 17,
  },
});
