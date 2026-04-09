import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = ({ children, style }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(20),
    padding: normalize(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
