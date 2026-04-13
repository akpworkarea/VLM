import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GlassCard } from './GlassCard';
import { COLORS } from '@/src/constants/colors';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { Zap, MessageCircle, Headphones, Video, Lightbulb } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Plan } from '@/src/models/plan.model';

const ICON_MAP: any = {
  Zap: Lightbulb,
  MessageCircle,
  Headphones,
  Video,
};

interface PlanCardProps {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, selected, onSelect }: PlanCardProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: selected ? withRepeat(withSequence(withTiming(1.02, { duration: 1000 }), withTiming(1, { duration: 1000 })), -1, true) : 1 }],
  }));

  const getPlanColor = () => {
    if (plan.id === 'basic') return COLORS.cyan;
    if (plan.id === 'pro') return '#3B82F6'; // Blue
    return COLORS.yellow;
  };

  const planColor = getPlanColor();

  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.9} style={styles.touchable}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <GlassCard 
          glow={selected} 
          glowType={plan.isRecommended ? 'yellow' : 'blue'}
          style={[
            styles.card, 
            { borderColor: selected ? planColor : 'rgba(255,255,255,0.1)' },
            selected && { borderWidth: 2 }
          ]}
          noPadding
        >
          {plan.isRecommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMMENDED</Text>
            </View>
          )}
          
          <View style={styles.content}>
            <Text style={styles.planName}>{plan.name}</Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>₹{plan.originalPrice}/mo</Text>
              <Text style={styles.discountPrice}>Discount price</Text>
              <Text style={[styles.price, { color: planColor }]}>₹{plan.price}/mo</Text>
            </View>

            {plan.trialDays && (
              <View style={[styles.trialBadge, { backgroundColor: planColor }]}>
                <Text style={styles.trialText}>{plan.trialDays} Days Free Trial</Text>
              </View>
            )}

            <View style={styles.features}>
              {plan.features.map((feature: any, index: number) => {
                const Icon = ICON_MAP[feature.icon] || Zap;
                return (
                  <View key={index} style={styles.featureItem}>
                    <Icon size={scale(18)} color={planColor} />
                    <View style={styles.featureText}>
                      <Text style={styles.featureValue}>{feature.value}</Text>
                      <Text style={styles.featureLabel}>{feature.label}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </GlassCard>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  animatedContainer: {
    width: '100%',
  },
  card: {
    height: normalize(440),
  },
  recommendedBadge: {
    backgroundColor: COLORS.yellow,
    paddingVertical: normalize(6),
    alignItems: 'center',
  },
  recommendedText: {
    fontSize: normalize(10),
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
  },
  content: {
    padding: normalize(16),
    alignItems: 'center',
  },
  planName: {
    ...TYPOGRAPHY.h3,
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: '700',
    marginBottom: normalize(20),
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: normalize(15),
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'rgba(255,255,255,0.4)',
    fontSize: normalize(12),
  },
  discountPrice: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(10),
    marginVertical: normalize(4),
  },
  price: {
    ...TYPOGRAPHY.h2,
    fontSize: normalize(22),
    fontWeight: '800',
  },
  trialBadge: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(15),
    marginBottom: normalize(25),
  },
  trialText: {
    color: '#000',
    fontSize: normalize(10),
    fontWeight: '800',
  },
  features: {
    width: '100%',
    gap: normalize(15),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  featureText: {
    flex: 1,
  },
  featureValue: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '700',
  },
  featureLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(10),
  },
});
