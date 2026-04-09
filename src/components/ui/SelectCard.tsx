import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { Check } from 'lucide-react-native';

interface SelectCardProps {
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'grid' | 'large' | 'horizontal';
}

export const SelectCard = ({ 
  label, 
  subLabel, 
  icon, 
  isSelected, 
  onPress, 
  style,
  variant = 'grid' 
}: SelectCardProps) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    glowOpacity.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: withSpring(isSelected && variant === 'horizontal' ? -5 : 0) }
    ] as any,
    borderColor: withTiming(isSelected ? COLORS.primary : 'rgba(255, 255, 255, 0.1)', { duration: 300 }),
    backgroundColor: withTiming(isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)', { duration: 300 }),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        {isSelected && (
          <Animated.View style={[StyleSheet.absoluteFill, glowStyle]}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.3)', 'transparent']}
              style={styles.gradient}
            />
            <View style={styles.checkIcon}>
              <Check size={12} color="#fff" strokeWidth={3} />
            </View>
          </Animated.View>
        )}
        
        <View style={[styles.content, variant === 'horizontal' && styles.horizontalContent]}>
          {icon && <View style={[styles.iconWrapper, variant === 'horizontal' && styles.horizontalIcon]}>{icon}</View>}
          <View style={variant === 'horizontal' && styles.horizontalText}>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
            {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(20),
    borderWidth: 1,
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
    padding: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  iconWrapper: {
    marginBottom: normalize(12),
  },
  horizontalIcon: {
    marginBottom: 0,
    marginRight: normalize(16),
  },
  horizontalText: {
    flex: 1,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: normalize(15),
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  subLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(11),
    marginTop: normalize(4),
    textAlign: 'center',
  },
  checkIcon: {
    position: 'absolute',
    top: normalize(8),
    right: normalize(8),
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(9),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

const variantStyles = {
  grid: {
    width: '47%',
    aspectRatio: 1,
  },
  large: {
    width: '100%',
    height: normalize(160),
    marginBottom: normalize(16),
  },
  horizontal: {
    width: '100%',
    height: normalize(70),
    marginBottom: normalize(12),
  },
};
