import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, { 
  FadeIn, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  useSharedValue 
} from 'react-native-reanimated';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface TeacherNodeProps {
  avatar: string;
  isOnline: boolean;
  delay?: number;
}

export const TeacherNode = ({ avatar, isOnline, delay = 0 }: TeacherNodeProps) => {
  const glow = useSharedValue(0.5);

  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.5, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 1 + glow.value * 0.1 }],
  }));

  return (
    <Animated.View 
      entering={FadeIn.delay(delay).duration(500)}
      style={styles.container}
    >
      <Animated.View style={[styles.glowRing, animatedGlowStyle]} />
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: avatar }} 
          style={styles.avatar} 
          referrerPolicy="no-referrer"
        />
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: scale(54),
    height: scale(54),
    borderRadius: scale(27),
    borderWidth: 2,
    borderColor: COLORS.cyan,
  },
  avatarContainer: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 2,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: scale(21),
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#000',
  },
});
