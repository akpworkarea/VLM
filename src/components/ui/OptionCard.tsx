import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize, scale } from '@/src/utils/responsive';
import { glassStyles } from '@/src/theme/glassStyles';

interface OptionCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  selected: boolean;
  onPress: () => void;
  containerStyle?: any;
}

export const OptionCard = ({ title, subtitle, icon: Icon, selected, onPress, containerStyle }: OptionCardProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: withSpring(selected ? COLORS.cyan : 'rgba(255, 255, 255, 0.1)'),
    backgroundColor: withSpring(selected ? 'rgba(34, 211, 238, 0.1)' : 'rgba(255, 255, 255, 0.05)'),
    transform: [{ scale: withSpring(selected ? 1.02 : 1) }],
  }));

  return (
    <TouchableOpacity style={[styles.touchable, containerStyle]} onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.container, animatedStyle, selected && styles.selectedShadow]}>
        <View style={[styles.iconCircle, { backgroundColor: selected ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.1)' }]}>
          <Icon size={scale(20)} color={selected ? COLORS.cyan : COLORS.textSecondary} />
        </View>
        <Text style={[styles.title, selected && { color: COLORS.cyan }]}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  container: {
    ...glassStyles.container,
    padding: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(130),
  },
  iconCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  selectedShadow: {
    shadowColor: COLORS.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: normalize(10),
    textAlign: 'center',
    marginTop: normalize(2),
  },
});
