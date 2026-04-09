import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar = ({ progress, label, showPercentage = false }: ProgressBarProps) => {
  const animatedProgress = useSharedValue(0);

  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(progress * 100)}%</Text>
          )}
        </View>
      )}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, animatedStyle]}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: normalize(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(8),
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: normalize(12),
    fontWeight: '500',
  },
  percentage: {
    color: COLORS.primary,
    fontSize: normalize(12),
    fontWeight: '700',
  },
  track: {
    height: normalize(6),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: normalize(3),
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: normalize(3),
  },
  gradient: {
    flex: 1,
  },
});
