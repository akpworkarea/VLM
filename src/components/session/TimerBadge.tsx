import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface TimerBadgeProps {
  remainingTime: number; // in seconds
}

export const TimerBadge = ({ remainingTime }: TimerBadgeProps) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft < 60) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>SESSION REMAINING: {formatTime(timeLeft)}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: normalize(8),
  },
  text: {
    color: COLORS.cyan,
    fontSize: normalize(12),
    fontWeight: '900',
    letterSpacing: 1,
  },
});
