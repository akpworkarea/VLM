import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withSequence, 
  withSpring, 
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface IconCircleProps {
  label?: string;
  icon?: React.ReactNode;
  color?: string;
}

export const IconCircle = ({ 
  label = "SCHEDULED", 
  icon = <Check size={normalize(32)} color={COLORS.success} />,
  color = COLORS.success
}: IconCircleProps) => {
  const scale = useSharedValue(0);
  const glow = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    glow.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
    opacity: interpolate(glow.value, [1, 1.2], [0.3, 0.1]),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Animated.View style={[styles.glow, animatedGlowStyle, { backgroundColor: color }]} />
        <Animated.View style={[styles.circle, animatedCircleStyle, { borderColor: color }]}>
          {icon}
        </Animated.View>
      </View>
      {label && (
        <Animated.Text style={[styles.label, animatedCircleStyle, { color }]}>
          {label}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(20),
  },
  iconWrapper: {
    width: normalize(100),
    height: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  glow: {
    position: 'absolute',
    width: normalize(90),
    height: normalize(90),
    borderRadius: normalize(45),
  },
  label: {
    ...TYPOGRAPHY.h3,
    marginTop: normalize(12),
    letterSpacing: 2,
    fontWeight: '700',
  },
});
