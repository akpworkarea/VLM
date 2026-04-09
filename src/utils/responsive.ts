import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on standard design width (e.g., iPhone 13/14)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const wp = (percentage: number) => {
  return (percentage * SCREEN_WIDTH) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * SCREEN_HEIGHT) / 100;
};

export const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const normalize = (size: number) => {
  const newSize = (SCREEN_WIDTH / guidelineBaseWidth) * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

