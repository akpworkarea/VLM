import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calculator, Atom, Beaker, Book, CheckCircle2 } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface SubjectCardProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onPress: (id: string) => void;
}

const IconMap: Record<string, any> = {
  calculator: Calculator,
  atom: Atom,
  beaker: Beaker,
  book: Book,
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ id, name, icon, isSelected, onPress }) => {
  const Icon = IconMap[icon] || Book;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: isSelected ? withSpring(COLORS.cyan) : withSpring(COLORS.glassBorder),
    backgroundColor: isSelected ? withSpring('rgba(34, 211, 238, 0.1)') : withSpring('rgba(255, 255, 255, 0.05)'),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(id)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        {isSelected && (
          <View style={styles.badge}>
            <CheckCircle2 size={normalize(14)} color={COLORS.cyan} fill="white" />
          </View>
        )}
        <Icon size={normalize(28)} color={isSelected ? COLORS.cyan : COLORS.textSecondary} />
        <Text style={[styles.name, isSelected && styles.selectedName]}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '23%',
    aspectRatio: 0.85,
  },
  card: {
    flex: 1,
    borderRadius: normalize(16),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(8),
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: normalize(-6),
    right: normalize(-6),
    zIndex: 1,
  },
  name: {
    ...TYPOGRAPHY.caption,
    fontSize: normalize(10),
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  selectedName: {
    color: COLORS.cyan,
  },
});
