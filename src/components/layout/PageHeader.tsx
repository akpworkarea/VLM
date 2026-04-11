import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

export const PageHeader = ({ 
  title = "VLM Academy Teacher App", 
  subtitle, 
  showBack = true 
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={normalize(24)} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {title.split(' ')[0]} <Text style={styles.titleLight}>{title.split(' ').slice(1).join(' ')}</Text>
        </Text>
      </View>
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: 'white',
    fontSize: normalize(18),
    fontWeight: '700',
  },
  titleLight: {
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  subtitle: {
    ...TYPOGRAPHY.h1,
    color: 'white',
    fontSize: normalize(20),
    fontWeight: '800',
    marginTop: normalize(15),
    textAlign: 'center',
    letterSpacing: 1,
  },
});
