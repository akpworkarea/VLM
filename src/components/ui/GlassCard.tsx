import React from 'react';
import { StyleSheet, View, Platform, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { useSlideUp } from '@/src/hooks/useAnimation';
import { glassStyles, GLASS_CONFIG } from '@/src/theme/glassStyles';

interface GlassCardProps {
  children: React.ReactNode;
  delay?: number;
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  glow?: boolean;
  glowType?: 'blue' | 'yellow';
}

export const GlassCard = ({ 
  children, 
  delay = 0, 
  noPadding = false, 
  style,
  intensity = GLASS_CONFIG.intensity,
  glow = false,
  glowType = 'blue'
}: GlassCardProps) => {
  const slideStyle = useSlideUp(delay);

  const glowStyle = glowType === 'yellow' ? glassStyles.glowYellow : glassStyles.glow;

  return (
    <Animated.View style={[
      glassStyles.container, 
      slideStyle, 
      glow && glowStyle,
      style
    ]}>
      <BlurView 
        intensity={intensity} 
        tint={GLASS_CONFIG.tint} 
        style={StyleSheet.absoluteFill} 
      />
      <LinearGradient
        colors={[...GLASS_CONFIG.gradientColors]}
        style={glassStyles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={[glassStyles.content, noPadding && { padding: 0 }]}>
        {children}
      </View>
    </Animated.View>
  );
};
