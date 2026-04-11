import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { CheckCircle2, GraduationCap, Users, UserSquare2 } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { normalize, scale } from '@/src/utils/responsive';
import { UserRole } from '@/src/store/useUserStore';

interface RoleCardProps {
  id: UserRole;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (id: UserRole) => void;
  delay?: number;
  key?: string | number;
}

const RoleIcon = ({ id, color }: { id: UserRole; color: string }) => {
  const size = scale(32);
  switch (id) {
    case 'student':
      return <GraduationCap size={size} color={color} />;
    case 'parent':
      return <Users size={size} color={color} />;
    case 'teacher':
      return <UserSquare2 size={size} color={color} />;
    default:
      return null;
  }
};

export const RoleCard = ({ id, title, description, selected, onSelect, delay = 0 }: RoleCardProps) => {
  const pressScale = useSharedValue(1);
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    if (selected) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withSpring(1);
    }
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: pressScale.value * pulseScale.value }
    ],
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onSelect(id)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.touchable}
    >
      <GlassCard 
        delay={delay} 
        glow={selected} 
        glowType="yellow"
        style={[styles.card, selected && styles.selectedCard]}
        noPadding
      >
        <Animated.View style={[styles.content, animatedStyle]}>
          <View style={styles.iconContainer}>
            <RoleIcon id={id} color={selected ? COLORS.yellow : COLORS.text} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, selected && { color: COLORS.yellow }]}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {selected && (
            <View style={styles.badge}>
              <CheckCircle2 size={scale(14)} color={COLORS.bgMain} />
              <Text style={styles.badgeText}>ACTIVE</Text>
            </View>
          )}
        </Animated.View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    marginBottom: normalize(16),
  },
  card: {
    width: '100%',
  },
  selectedCard: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(20),
    gap: normalize(16),
  },
  iconContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: normalize(4),
  },
  description: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    lineHeight: normalize(16),
  },
  badge: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.yellow,
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(12),
    gap: normalize(4),
  },
  badgeText: {
    fontSize: normalize(10),
    fontWeight: '800',
    color: COLORS.bgMain,
  },
});
