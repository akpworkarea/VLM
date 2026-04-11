import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({ 
  text, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle, 
  icon, 
  iconPosition = 'left',
  disabled,
  loading 
}: ButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {iconPosition === 'left' && icon}
          <Text style={[styles.text, textStyle, variant === 'outline' && styles.outlineText]}>
            {text}
          </Text>
          {iconPosition === 'right' && icon}
        </>
      )}
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[styles.touchable, (disabled || loading) && { opacity: 0.5 }]}
      >
        <Animated.View style={[styles.container, styles.glow, animatedStyle, style]}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {renderContent()}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.touchable, disabled && { opacity: 0.5 }]}
    >
      <Animated.View style={[
        styles.container, 
        variant === 'outline' && styles.outline,
        animatedStyle, 
        style
      ]}>
        {renderContent()}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  container: {
    height: normalize(56),
    borderRadius: normalize(28),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: normalize(8),
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: normalize(8),
  },
  outline: {
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  text: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  outlineText: {
    color: COLORS.text,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});
