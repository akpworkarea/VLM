import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, ViewStyle, StyleProp } from 'react-native';
import { Background } from '@/src/components/background';
import { normalize } from '@/src/utils/responsive';

interface ScreenWrapperProps {
  footer?: React.ReactNode;
  noPadding?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
}

export const ScreenWrapper = ({ 
  children, 
  footer, 
  noPadding, 
  contentContainerStyle,
  scrollEnabled = true 
}: React.PropsWithChildren<ScreenWrapperProps>) => {
  const content = scrollEnabled ? (
    <ScrollView 
      contentContainerStyle={[
        styles.scrollContent, 
        noPadding && { padding: 0 },
        contentContainerStyle
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, noPadding && { padding: 0 }, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Background />
      <SafeAreaView style={styles.safeArea}>
        {content}
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
  flex: {
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
