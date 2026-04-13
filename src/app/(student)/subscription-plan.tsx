import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PlanCard } from '@/src/components/ui/PlanCard';
import { Button } from '@/src/components/ui/Button';
import { normalize, wp, hp, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { usePlans } from '@/src/hooks/usePlans';
import { useUserStore } from '@/src/store/useUserStore';

export default function SubscriptionPlanScreen() {
  const router = useRouter();
  const { plans, loading, startTrial } = usePlans();
  const { setSelectedPlan } = useUserStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [trialLoading, setTrialLoading] = useState(false);

  const handleStartTrial = async () => {
    if (!selectedId) return;
    
    setTrialLoading(true);
    const success = await startTrial(selectedId);
    if (success) {
      const selectedPlan = plans.find(p => p.id === selectedId);
      if (selectedPlan) setSelectedPlan(selectedPlan);
      router.replace('/(student)/(home)/home');
    }
    setTrialLoading(false);
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.cyan} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={scale(24)} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3413/3413535.png' }} 
            style={styles.logo}
            referrerPolicy="no-referrer"
          />
          <Text style={styles.logoText}>VLM ACADEMY</Text>
        </View>

        <Text style={styles.headerTitle}>Choose Your Learning Plan</Text>
      </View>

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={wp(85)}
        decelerationRate="fast"
      >
        {plans.map((plan, index) => (
          <Animated.View 
            key={plan.id}
            entering={FadeInDown.delay(100 * index)}
            style={styles.cardWrapper}
          >
            <PlanCard 
              plan={plan}
              selected={selectedId === plan.id}
              onSelect={() => setSelectedId(plan.id)}
            />
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Activate trial for ₹1</Text>
        <Button 
          text="START 3-DAY TRIAL" 
          onPress={handleStartTrial}
          disabled={!selectedId}
          loading={trialLoading}
          glow
          style={styles.button}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: normalize(20),
    paddingTop: hp(1),
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  backButton: {
    position: 'absolute',
    left: normalize(20),
    top: hp(1),
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  logo: {
    width: scale(60),
    height: scale(60),
    marginBottom: normalize(8),
  },
  logoText: {
    color: COLORS.yellow,
    fontSize: normalize(18),
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: '#fff',
    fontSize: normalize(20),
    textAlign: 'center',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(40),
    gap: normalize(20),
  },
  cardWrapper: {
    width: wp(55),
  },
  footer: {
    padding: normalize(20),
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.h3,
    color: '#fff',
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(15),
    fontWeight: '700',
    marginTop: hp(3),
  },
  button: {
    width: '100%',
    height: normalize(56),
    borderRadius: normalize(28),
  },
});
