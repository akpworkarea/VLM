import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Edit2 } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface InfoCardProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

export const InfoCard = ({ title, onEdit, children, delay = 0, style }: InfoCardProps) => {
  return (
    <GlassCard delay={delay} style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Edit2 size={normalize(18)} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    fontSize: normalize(16),
  },
  content: {
    width: '100%',
  },
});
