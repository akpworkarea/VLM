import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  interpolate,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { 
  Edit3, 
  Send, 
  Calendar, 
  User, 
  ShieldCheck,
  LucideIcon
} from 'lucide-react-native';
import { VerificationStepStatus } from '@/src/models/verification.model';
import { COLORS } from '@/src/constants/colors';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

const IconMap: Record<string, LucideIcon> = {
  'edit-3': Edit3,
  'send': Send,
  'calendar': Calendar,
  'user': User,
  'shield-check': ShieldCheck,
};

interface TimelineItemProps {
  title: string;
  description: string;
  status: VerificationStepStatus;
  iconName: string;
  isLast?: boolean;
  delay?: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  status,
  iconName,
  isLast = false,
  delay = 0,
}) => {
  const Icon = IconMap[iconName] || Edit3;
  
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const pulse = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 600 }));

    if (status === 'active') {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [status, delay]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.2], [0.4, 0.1]),
  }));

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return COLORS.yellow;
      case 'active': return COLORS.cyan;
      case 'pending': return 'rgba(255, 255, 255, 0.2)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  };

  const color = getStatusColor();

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <View style={styles.leftColumn}>
        <View style={styles.nodeWrapper}>
          {status === 'active' && (
            <Animated.View style={[styles.glow, animatedGlowStyle, { backgroundColor: color }]} />
          )}
          <View style={[
            styles.node, 
            { borderColor: color, backgroundColor: status === 'pending' ? 'transparent' : 'rgba(255,255,255,0.05)' },
            status === 'pending' && styles.pendingNode
          ]}>
            <Icon size={scale(20)} color={color} />
          </View>
        </View>
        {!isLast && (
          <View style={[
            styles.line, 
            { backgroundColor: status === 'completed' ? COLORS.yellow : 'rgba(255,255,255,0.1)' },
            status === 'completed' ? styles.solidLine : styles.dashedLine
          ]} />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[
          styles.title, 
          { color: status === 'pending' ? 'rgba(255,255,255,0.4)' : '#fff' },
          status === 'active' && { color: COLORS.cyan }
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.description,
          { color: status === 'pending' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)' }
        ]}>
          {description}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: normalize(80),
  },
  leftColumn: {
    alignItems: 'center',
    width: normalize(60),
  },
  nodeWrapper: {
    width: normalize(44),
    height: normalize(44),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  node: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingNode: {
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  glow: {
    position: 'absolute',
    width: normalize(54),
    height: normalize(54),
    borderRadius: normalize(27),
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: normalize(-2),
    marginBottom: normalize(-2),
    zIndex: 1,
  },
  solidLine: {
    // Already solid by default
  },
  dashedLine: {
    // React Native doesn't support dashed lines on Views easily for height
    // We can simulate it or just use a dimmed solid line
    opacity: 0.3,
  },
  content: {
    flex: 1,
    paddingTop: normalize(8),
    paddingBottom: normalize(20),
    paddingLeft: normalize(10),
  },
  title: {
    ...TYPOGRAPHY.h3,
    fontSize: normalize(16),
    fontWeight: '700',
    marginBottom: normalize(4),
  },
  description: {
    ...TYPOGRAPHY.body,
    fontSize: normalize(13),
    lineHeight: normalize(18),
  },
});
