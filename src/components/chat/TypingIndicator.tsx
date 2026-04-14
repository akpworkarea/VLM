import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withSequence, 
  withTiming,
  withDelay
} from 'react-native-reanimated';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

const Dot = ({ index }: { index: number }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(index * 200, withTiming(1, { duration: 400 })),
        withTiming(0.3, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: opacity.value }],
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <Dot index={0} />
      <Dot index={1} />
      <Dot index={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
    padding: normalize(12),
  },
  dot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    backgroundColor: COLORS.cyan,
  },
});
