import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  interpolate
} from 'react-native-reanimated';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface PulseCircleProps {
  label: string;
  subLabel?: string;
}

export const PulseCircle = ({ label, subLabel }: PulseCircleProps) => {
  const pulse = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: opacity.value,
  }));

  const animatedInnerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [1, 1.2], [1, 1.05]) }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulse, animatedPulseStyle]} />
      <Animated.View style={[styles.inner, animatedInnerStyle]}>
        <Text style={styles.label}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: COLORS.cyan,
    borderWidth: 2,
    borderColor: COLORS.cyan,
  },
  inner: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: COLORS.cyan,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    color: '#fff',
    fontSize: normalize(12),
    fontWeight: '900',
    textAlign: 'center',
  },
  subLabel: {
    color: COLORS.cyan,
    fontSize: normalize(8),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
  },
});
