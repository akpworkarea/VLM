import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  useAnimatedStyle, 
  withSpring, 
  interpolate,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { Button } from '@/src/components/ui/Button';
import { normalize, wp, hp, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: '24×7 Live Teacher Support',
    subtitle: 'Get instant help anytime through chat, audio, or video.',
    image: 'https://picsum.photos/seed/support/800/800',
  },
  {
    id: '2',
    title: 'Personalized Learning',
    subtitle: 'Adaptive paths tailored to your strengths and weaknesses.',
    image: 'https://picsum.photos/seed/learning/800/800',
  },
  {
    id: '3',
    title: 'Interactive Quizzes',
    subtitle: 'Master subjects with fun and engaging practice sessions.',
    image: 'https://picsum.photos/seed/quiz/800/800',
  },
];

export default function OnboardingIntroScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const onScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    setActiveSlide(index);
    scrollX.value = contentOffset;
  };

  const handleNext = () => {
    router.push('/(student)/student-profile');
  };

  const handleSkip = () => {
    router.push('/(student)/student-profile');
  };

  const renderItem = ({ item, index }: { item: typeof SLIDES[0], index: number }) => {
    return (
      <View style={styles.slide}>
        {/* Feature Illustration */}
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.illustrationContainer}
        >
          <View style={styles.illustrationPlaceholder}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.illustration}
              referrerPolicy="no-referrer"
            />
          </View>
        </Animated.View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper noPadding>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://picsum.photos/seed/vlm-logo/200/200' }} 
            style={styles.logo}
            referrerPolicy="no-referrer"
          />
          <Text style={styles.logoTitle}>VLM ACADEMY</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={SLIDES}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                activeSlide === i && styles.activeDot
              ]} 
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            {activeSlide === SLIDES.length - 1 ? (
              <Animated.View entering={FadeInDown} style={styles.nextButtonWrapper}>
                <Button 
                  text="Next" 
                  onPress={handleNext} 
                  style={styles.nextButton}
                />
              </Animated.View>
            ) : (
              <View style={styles.nextButtonPlaceholder} />
            )}
            
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: hp(6),
    zIndex: 10,
  },
  logo: {
    width: normalize(60),
    height: normalize(60),
    marginBottom: normalize(10),
    resizeMode: 'contain',
  },
  logoTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'serif', // Attempting serif as seen in image
    marginTop:hp(4)
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(2),
  },
  illustrationContainer: {
    width: wp(75),
    height: wp(75),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  illustrationPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(40),
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    paddingHorizontal: normalize(30),
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: 'white',
    textAlign: 'center',
    marginBottom: normalize(10),
    fontSize: normalize(24),
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: normalize(20),
    marginBottom: normalize(20),
    fontSize: normalize(14),
  },
  pagination: {
    flexDirection: 'row',
    gap: normalize(8),
    marginBottom: hp(2),
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeDot: {
    width: normalize(24),
    backgroundColor: COLORS.cyan,
  },
  footer: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingBottom: hp(5),
    height: normalize(100),
    justifyContent: 'center',
    marginTop: hp(7),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nextButtonWrapper: {
    width: wp(60),
  },
  nextButton: {
    width: '100%',
  },
  nextButtonPlaceholder: {
    width: wp(60),
  },
  skipButton: {
    position: 'absolute',
    right: 0,
    padding: normalize(10),
  },
  skipText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cyan,
    fontWeight: '600',
  },
});
