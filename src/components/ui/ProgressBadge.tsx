import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface ProgressBadgeProps {
  used: number;
  total: number;
}

export const ProgressBadge = ({ used, total }: ProgressBadgeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>AI Credits:</Text>
      <Text style={styles.value}>{used} / {total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: normalize(8),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '700',
  },
});
