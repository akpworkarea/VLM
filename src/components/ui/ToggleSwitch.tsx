import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolateColor
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ToggleSwitch = ({ value, onValueChange }: ToggleSwitchProps) => {
  const translateX = useSharedValue(value ? 1 : 0);
  const scale = useSharedValue(1);

  const handleToggle = (newValue: boolean) => {
    if (newValue === value) return;
    onValueChange(newValue);
    translateX.value = withSpring(newValue ? 1 : 0, { damping: 15, stiffness: 150 });
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const pillWidth = normalize(60);
  
  const animatedPillStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value * pillWidth },
      { scale: scale.value }
    ] as any,
  }));

  return (
    <View style={styles.switchTrack}>
      <Animated.View style={[styles.activePill, animatedPillStyle]}>
        <LinearGradient
          colors={['#fbbf24', '#f59e0b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
      
      <TouchableOpacity 
        activeOpacity={1}
        onPress={() => handleToggle(false)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.option}
      >
        <Text style={[styles.optionText, !value && styles.activeText]}>NO</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        activeOpacity={1}
        onPress={() => handleToggle(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.option}
      >
        <Text style={[styles.optionText, value && styles.activeText]}>YES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchTrack: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(12),
    width: normalize(120),
    height: normalize(40),
    padding: normalize(4),
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    top: normalize(4),
    left: normalize(4),
    width: normalize(56),
    height: normalize(32),
    borderRadius: normalize(8),
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    color: COLORS.textSecondary,
    fontSize: normalize(12),
    fontWeight: '700',
  },
  activeText: {
    color: '#000',
  },
});
