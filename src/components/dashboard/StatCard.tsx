import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DashboardCard } from './DashboardCard';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  glowType: 'blue' | 'yellow' | 'red' | 'purple';
  delay?: number;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  glowType, 
  delay = 0 
}: StatCardProps) => {
  const color = getGlowColor(glowType);

  return (
    <DashboardCard 
      glow 
      glowType={glowType} 
      delay={delay}
      style={styles.card}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}22` }]}>
        <Icon size={scale(24)} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
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
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: '#fff',
    fontSize: normalize(11),
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: normalize(4),
  },
  content: {
    alignItems: 'center',
  },
  value: {
    ...TYPOGRAPHY.h2,
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(10),
    marginTop: normalize(2),
    textAlign: 'center',
    lineHeight: normalize(14),
  },
});
