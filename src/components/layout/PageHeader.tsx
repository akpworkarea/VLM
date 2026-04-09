import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, GraduationCap } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export const PageHeader = ({ title, subtitle, showBack = true }: PageHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={normalize(28)} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>VLM Academy <Text style={styles.subtitle}>Teacher App</Text></Text>
        </View>
        <GraduationCap size={normalize(24)} color="rgba(255,255,255,0.3)" />
      </View>
      {subtitle && (
        <View style={styles.subtitleRow}>
          <Text style={styles.pageSubtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
    paddingBottom: normalize(20),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  backButton: {
    marginLeft: normalize(-10),
  },
  titleContainer: {
    flex: 1,
    marginLeft: normalize(10),
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    fontSize: normalize(18),
  },
  subtitle: {
    fontWeight: '400',
    color: 'rgba(255,255,255,0.5)',
  },
  subtitleRow: {
    alignItems: 'center',
  },
  pageSubtitle: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    fontSize: normalize(14),
    letterSpacing: 1,
    textAlign: 'center',
  },
});
