import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { normalize } from '@/src/utils/responsive';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header = ({ title = 'VLM Academy', showBack = true }: HeaderProps) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withDelay(100, withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }));
    translateX.value = withDelay(100, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Teacher App</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
    marginBottom: normalize(10),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: normalize(12),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: normalize(8),
  },
  title: {
    color: '#fff',
    fontSize: normalize(20),
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(16),
    fontWeight: '400',
  },
});
