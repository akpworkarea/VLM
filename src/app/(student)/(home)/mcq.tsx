import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function PlaceholderScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>Coming Soon</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...TYPOGRAPHY.h2,
    color: '#fff',
  },
});
