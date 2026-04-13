import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface StatusBadgeProps {
  text: string;
  type?: 'success' | 'primary' | 'warning' | 'error';
}

export const StatusBadge = ({ text, type = 'primary' }: StatusBadgeProps) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const getColor = () => {
    switch (type) {
      case 'success': return COLORS.success;
      case 'warning': return COLORS.yellow;
      case 'error': return COLORS.error;
      default: return COLORS.primary;
    }
  };

  const color = getColor();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color }]}>
        {text}
      </Text>
      <Animated.View 
        style={[
          styles.dot, 
          { backgroundColor: color },
          animatedStyle
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  text: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    fontSize: normalize(12),
  },
  dot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(2),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
