import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface DashboardCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  glow?: boolean;
  glowType?: 'blue' | 'yellow' | 'red' | 'purple';
  delay?: number;
}

export const DashboardCard = ({ 
  children, 
  style, 
  onPress, 
  glow = false, 
  glowType = 'blue',
  delay = 0 
}: DashboardCardProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    // Add subtle scale on press if needed, but for now just base
    transform: [{ scale: 1 }],
  }));

  const content = (
    <GlassCard 
      style={[styles.card, style]} 
      glow={glow} 
      glowType={glowType as any}
      delay={delay}
    >
      {children}
    </GlassCard>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onPress}
        style={styles.touchable}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 24,
  },
});
