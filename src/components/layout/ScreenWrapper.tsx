import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { Background } from '@/src/components/background';
import { normalize } from '@/src/utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
}

export const ScreenWrapper = ({ children, footer, noPadding }: ScreenWrapperProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Background />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, noPadding && { padding: 0 }]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {footer && <View style={styles.footer}>{footer}</View>}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: normalize(20),
  },
  footer: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
  },
});
