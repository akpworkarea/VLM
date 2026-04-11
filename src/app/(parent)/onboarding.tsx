import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

export default function ParentOnboarding() {
  return (
    <ScreenWrapper>
      <PageHeader title="Parent Portal" subtitle="ONBOARDING" showBack={false} />
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Parent Onboarding Flow</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  text: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    textAlign: 'center',
  },
});
