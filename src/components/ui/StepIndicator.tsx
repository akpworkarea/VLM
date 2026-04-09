import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withDelay
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps?: Step[];
}

const DEFAULT_STEPS = [
  { number: 1, label: 'Basic Info' },
  { number: 2, label: 'Qualification' },
  { number: 3, label: 'Experience' },
  { number: 4, label: 'Onboarding' },
  { number: 5, label: 'Interview' },
];

export const StepIndicator = ({ currentStep, totalSteps, steps = DEFAULT_STEPS }: StepIndicatorProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    opacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(200, withTiming(0, { duration: 600 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <View style={styles.stepWrapper}>
            <StepItem 
              active={step.number <= currentStep} 
              isCurrent={step.number === currentStep} 
              number={step.number} 
            />
            <Text 
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={[
                styles.stepLabel, 
                { color: step.number <= currentStep ? '#fff' : COLORS.textSecondary }
              ]}
            >
              {step.label}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[
              styles.line, 
              { backgroundColor: step.number < currentStep ? COLORS.primary : COLORS.border }
            ]} />
          )}
        </React.Fragment>
      ))}
    </Animated.View>
  );
};

const StepItem = ({ active, isCurrent, number }: { active: boolean; isCurrent: boolean; number: number }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isCurrent) {
      scale.value = withSpring(1.2);
    } else {
      scale.value = withSpring(1);
    }
  }, [isCurrent]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: active ? COLORS.primary : COLORS.surface,
    borderColor: isCurrent ? COLORS.primary : 'transparent',
    borderWidth: isCurrent ? 2 : 0,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: withTiming(isCurrent ? 0.8 : 0, { duration: 300 }),
    shadowRadius: withTiming(isCurrent ? 12 : 0, { duration: 300 }),
    elevation: withTiming(isCurrent ? 8 : 0, { duration: 300 }),
  }));

  return (
    <Animated.View style={[styles.stepCircle, animatedStyle]}>
      <Text style={[styles.stepText, { color: active ? '#fff' : COLORS.textSecondary }]}>
        {number}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: normalize(20),
    paddingHorizontal: normalize(15),
  },
  stepWrapper: {
    alignItems: 'center',
    width: normalize(62),
  },
  stepLabel: {
    fontSize: normalize(8),
    marginTop: normalize(8),
    textAlign: 'center',
    fontWeight: '600',
    width: normalize(62),
  },
  stepCircle: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: normalize(10),
    fontWeight: '700',
  },
  line: {
    flex: 1,
    height: 1,
    marginTop: normalize(12),
    marginHorizontal: normalize(-18),
  },
});
