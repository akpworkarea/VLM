import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSequence, 
  withTiming, 
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';
import { CountdownTime } from '@/src/hooks/useCountdown';

interface CountdownTimerProps {
  timeLeft: CountdownTime;
  delay?: number;
}

const TimerUnit = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  React.useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 500 }));
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.unitContainer, animatedStyle]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
};

export const CountdownTimer = ({ timeLeft, delay = 0 }: CountdownTimerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerLabel}>REAPPLICATION COUNTDOWN:</Text>
      <View style={styles.timerRow}>
        <TimerUnit value={timeLeft.days} label="DAYS" delay={delay} />
        <Text style={styles.separator}>:</Text>
        <TimerUnit value={timeLeft.hours} label="HOURS" delay={delay + 100} />
        <Text style={styles.separator}>:</Text>
        <TimerUnit value={timeLeft.minutes} label="MINUTES" delay={delay + 200} />
        <Text style={styles.separator}>:</Text>
        <TimerUnit value={timeLeft.seconds} label="SECONDS" delay={delay + 300} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  headerLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
    letterSpacing: 1.5,
    marginBottom: normalize(15),
    fontWeight: '700',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(10),
  },
  unitContainer: {
    alignItems: 'center',
    minWidth: normalize(65),
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingVertical: normalize(10),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  value: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    fontSize: normalize(36),
    fontWeight: '800',
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: normalize(10),
    marginTop: normalize(4),
    letterSpacing: 1,
  },
  separator: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    fontSize: normalize(28),
    fontWeight: '800',
    marginTop: normalize(8),
  },
});
