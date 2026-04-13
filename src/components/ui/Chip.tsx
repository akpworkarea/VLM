import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withSpring(selected ? COLORS.cyan + '33' : 'rgba(255,255,255,0.05)'),
    borderColor: withSpring(selected ? COLORS.cyan : 'rgba(255,255,255,0.1)'),
    transform: [{ scale: withSpring(selected ? 1.05 : 1) }]
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    borderRadius: normalize(20),
    borderWidth: 1,
    marginRight: normalize(8),
    marginBottom: normalize(8),
  },
  label: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(14),
  },
  selectedLabel: {
    color: COLORS.cyan,
    fontWeight: '600',
  },
});
