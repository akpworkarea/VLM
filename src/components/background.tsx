import SvgBackground from "@/assets/svg/background.svg";
import React from "react";
import { StyleSheet } from "react-native";

export const Background: React.FC = () => {
  return (
    <SvgBackground
      width="102%"
      height="102%"
      preserveAspectRatio="none" // 🔥 THIS FIXES FITTING
      style={[styles.svg]}
    />
  );
};



const styles = StyleSheet.create({
  svg: {
    ...StyleSheet.absoluteFillObject,
  },
});