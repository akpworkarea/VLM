import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { useScalePress } from '@/src/hooks/useAnimation';

interface TimeSlotChipProps {
  time: string;
  available: boolean;
  selected: boolean;
  onPress: () => void;
}

export const TimeSlotChip = ({ time, available, selected, onPress }: TimeSlotChipProps) => {
  const { animatedStyle, onPressIn, onPressOut } = useScalePress();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={!available}
        style={[
          styles.chip,
          selected && styles.selectedChip,
          !available && styles.disabledChip,
        ]}
      >
        <Text style={[
          styles.timeText,
          selected && styles.selectedText,
          !available && styles.disabledText
        ]}>
          {time}
        </Text>
        {selected && (
          <View style={styles.checkContainer}>
            <Check size={10} color="#fff" strokeWidth={4} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chip: {
    height: normalize(44),
    borderRadius: normalize(22),
    borderWidth: 1.5,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedChip: {
    borderColor: '#00ffff',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  disabledChip: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  timeText: {
    color: '#00ffff',
    fontSize: normalize(13),
    fontWeight: '700',
  },
  selectedText: {
    color: '#00ffff',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.2)',
  },
  checkContainer: {
    position: 'absolute',
    top: -normalize(6),
    right: -normalize(6),
    backgroundColor: '#00ffff',
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(9),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.bgMain,
  },
});
