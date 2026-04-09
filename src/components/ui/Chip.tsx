import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const Chip = ({ label, isSelected, onPress, style }: ChipProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: withTiming(isSelected ? COLORS.primary : 'rgba(255, 255, 255, 0.1)', { duration: 300 }),
    backgroundColor: withTiming(isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)', { duration: 300 }),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(20),
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: normalize(8),
    marginBottom: normalize(8),
  },
  touchable: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: normalize(13),
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '700',
  },
});
