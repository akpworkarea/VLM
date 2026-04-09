import { useEffect } from 'react';
import { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  Easing,
  withDelay,
  withSpring
} from 'react-native-reanimated';

export const useFadeIn = (delay = 0, duration = 800) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
  }, [delay, duration]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

export const useSlideUp = (delay = 0, duration = 800) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.exp) }));
    opacity.value = withDelay(delay, withTiming(1, { duration }));
  }, [delay, duration]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
};

export const usePulse = (duration = 1500) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: duration / 2 }),
        withTiming(1, { duration: duration / 2 })
      ),
      -1,
      true
    );
  }, [duration]);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};

export const useFloating = (duration = 3000, offset = 10) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(offset, { duration: duration, easing: Easing.inOut(Easing.sin) }),
        withTiming(-offset, { duration: duration, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, [duration, offset]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
};

export const useScalePress = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return { animatedStyle, onPressIn, onPressOut };
};
