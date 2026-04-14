import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import Animated, { 
  useAnimatedProps, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';

const AnimatedLine = Animated.createAnimatedComponent(Line);

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  key?: string;
}

export const ConnectionLine = ({ x1, y1, x2, y2 }: ConnectionLineProps) => {
  const dashOffset = useSharedValue(0);

  useEffect(() => {
    dashOffset.value = withRepeat(
      withTiming(-20, { 
        duration: 1000, 
        easing: Easing.linear 
      }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  return (
    <Svg style={StyleSheet.absoluteFill}>
      <AnimatedLine
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={COLORS.cyan}
        strokeWidth="2"
        strokeDasharray="6, 4"
        animatedProps={animatedProps}
        opacity={0.6}
      />
    </Svg>
  );
};
