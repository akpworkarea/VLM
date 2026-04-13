import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DashboardCard } from './DashboardCard';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { LucideIcon } from 'lucide-react-native';
import { StatusBadge } from '../ui/StatusBadge';

interface FeatureCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  glowType: 'blue' | 'yellow' | 'red' | 'purple';
  onPress: () => void;
  badge?: string;
  delay?: number;
}

export const FeatureCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  glowType, 
  onPress, 
  badge,
  delay = 0 
}: FeatureCardProps) => {
  return (
    <DashboardCard 
      onPress={onPress} 
      glow 
      glowType={glowType} 
      delay={delay}
      style={styles.card}
    >
      {badge && (
        <View style={styles.badgeContainer}>
          <StatusBadge text={badge} type="warning" />
        </View>
      )}
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${getGlowColor(glowType)}22` }]}>
          <Icon size={scale(28)} color={getGlowColor(glowType)} />
        </View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </DashboardCard>
  );
};

const getGlowColor = (type: string) => {
  switch (type) {
    case 'yellow': return '#EAB308';
    case 'red': return '#EF4444';
    case 'purple': return '#A855F7';
    default: return '#22d3ee';
  }
};

const styles = StyleSheet.create({
  card: {
    height: normalize(140),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(10),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: '#fff',
    textAlign: 'center',
    fontSize: normalize(12),
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(10),
    marginTop: normalize(4),
    textAlign: 'center',
    lineHeight: normalize(14),
  },
});
