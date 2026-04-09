import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface StepperSelectorProps {
  value: number;
  onValueChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

export const StepperSelector = ({ 
  value, 
  onValueChange, 
  label, 
  min = 0, 
  max = 50 
}: StepperSelectorProps) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const handleIncrement = () => {
    if (value < max) {
      onValueChange(value + 1);
      animateChange(-10);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onValueChange(value - 1);
      animateChange(10);
    }
  };

  const animateChange = (direction: number) => {
    scale.value = withSequence(
      withSpring(1.1, { damping: 10, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    translateY.value = direction;
    translateY.value = withSpring(0, { damping: 12, stiffness: 150 });
  };

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ] as any,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleDecrement} 
        style={styles.arrow}
        activeOpacity={0.6}
      >
        <ChevronLeft size={20} color={value > min ? COLORS.primary : 'rgba(255,255,255,0.2)'} />
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <Animated.View style={[styles.textWrapper, animatedTextStyle]}>
          <Text style={styles.valueText}>{value} {label}</Text>
        </Animated.View>
      </View>

      <TouchableOpacity 
        onPress={handleIncrement} 
        style={styles.arrow}
        activeOpacity={0.6}
      >
        <ChevronRight size={20} color={value < max ? COLORS.primary : 'rgba(255,255,255,0.2)'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: normalize(8),
    height: normalize(50),
    width: '48.5%',
  },
  arrow: {
    padding: normalize(2),
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: '#fff',
    fontSize: normalize(13),
    fontWeight: '600',
  },
});
