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
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'warning';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  glow?: boolean;
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
  loading,
  glow = true
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
          <Text 
            style={[styles.text, textStyle, variant === 'outline' && styles.outlineText]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {text}
          </Text>
          {iconPosition === 'right' && icon}
        </>
      )}
    </>
  );

  if (variant === 'primary' || variant === 'danger' || variant === 'warning') {
    let gradientColors = [COLORS.primary, COLORS.secondary];
    if (variant === 'danger') gradientColors = [COLORS.red, COLORS.redDark];
    if (variant === 'warning') gradientColors = [COLORS.yellow, COLORS.orange];

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[styles.touchable, (disabled || loading) && { opacity: 0.5 }]}
      >
        <Animated.View style={[
          styles.container, 
          glow && styles.glow, 
          variant === 'danger' && glow && styles.dangerGlow,
          variant === 'warning' && glow && styles.warningGlow,
          animatedStyle, 
          style
        ]}>
          <LinearGradient
            colors={gradientColors}
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
    paddingHorizontal: normalize(20),
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
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: normalize(4),
  },
  outlineText: {
    color: COLORS.text,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 12,
  },
  dangerGlow: {
    shadowColor: COLORS.red,
  },
  warningGlow: {
    shadowColor: COLORS.yellow,
  },
});
