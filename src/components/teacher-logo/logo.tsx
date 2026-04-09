import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withRepeat,
  Easing
} from 'react-native-reanimated';

import LogoSvg from "@/assets/svg/teacherModelLogo/logo.svg";
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { normalize, wp } from '@/src/utils/responsive';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = 'VLM Academy' }: HeaderProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);
  const floatY = useSharedValue(0);
  const logoScale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(
      100,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) })
    );

    translateY.value = withDelay(
      100,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) })
    );

    floatY.value = withRepeat(
      withTiming(8, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    logoScale.value = withRepeat(
      withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const containerAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value + floatY.value }],
  }));

  const logoAnimated = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerAnimated]}>

      {/* ✅ SVG LOGO (Replaces VLM Text Circle) */}
      <Animated.View style={logoAnimated}>
        <LogoSvg
          width={wp(45)}
          height={wp(12)}
        />
      </Animated.View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: normalize(20),
    marginBottom: normalize(30),
  },

});