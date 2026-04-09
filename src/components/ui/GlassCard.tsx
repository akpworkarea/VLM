import React from 'react';
import { StyleSheet, View, Platform, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { useSlideUp } from '@/src/hooks/useAnimation';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface GlassCardProps {
  children: React.ReactNode;
  delay?: number;
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const GlassCard = ({ children, delay = 0, noPadding = false, style }: GlassCardProps) => {
  const slideStyle = useSlideUp(delay);

  return (
    <Animated.View style={[styles.container, slideStyle, style]}>
      <BlurView intensity={Platform.OS === 'ios' ? 20 : 100} tint="dark" style={styles.blur}>
        <View style={[styles.content, noPadding && { padding: 0 }]}>
          {children}
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(24),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.08)',
    shadowColor: COLORS.glow.blue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  blur: {
    width: '100%',
  },
  content: {
    padding: normalize(20),
  },
});
