import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { Check } from 'lucide-react-native';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const StepProgress = ({ currentStep, totalSteps, stepLabels }: StepProgressProps) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(currentStep / (totalSteps - 1), { duration: 500 });
  }, [currentStep]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {stepLabels.map((label, index) => (
          <StepItem 
            key={index} 
            index={index} 
            isActive={index === currentStep} 
            isCompleted={index < currentStep} 
            label={label}
          />
        ))}
      </View>
      
      <View style={styles.track}>
        <Animated.View style={[styles.fill, progressStyle]} />
      </View>
    </View>
  );
};

interface StepItemProps {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  label: string;
  key?: any;
}

const StepItem = ({ index, isActive, isCompleted, label }: StepItemProps) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withSpring(isActive ? 1.2 : 1);
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: withTiming(
      isCompleted ? COLORS.primary : isActive ? COLORS.primary : 'rgba(255, 255, 255, 0.1)',
      { duration: 300 }
    ),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: withTiming(isActive ? 0.8 : 0, { duration: 300 }),
    shadowRadius: withTiming(isActive ? 12 : 0, { duration: 300 }),
    elevation: withTiming(isActive ? 8 : 0, { duration: 300 }),
  }));

  return (
    <View style={styles.stepItem}>
      <Animated.View style={[styles.dot, animatedStyle]}>
        <Text style={[
          styles.stepNumber, 
          (isActive || isCompleted) && styles.activeStepNumber
        ]}>
          {index + 1}
        </Text>
      </Animated.View>
      <Text style={[styles.stepLabel, isActive && styles.activeStepLabel]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: normalize(20),
    marginVertical: normalize(20),
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(12),
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(6),
  },
  stepNumber: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(10),
    fontWeight: '700',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepLabel: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: normalize(9),
    fontWeight: '600',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  track: {
    height: normalize(4),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(2),
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: normalize(2),
  },
});
