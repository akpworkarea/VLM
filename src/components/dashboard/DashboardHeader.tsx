import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { Bell, GraduationCap } from 'lucide-react-native';

interface DashboardHeaderProps {
  name: string;
  onNotificationPress: () => void;
}

export const DashboardHeader = ({ name, onNotificationPress }: DashboardHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <GraduationCap size={scale(20)} color="#fff" />
        </View>
        <Text style={styles.greeting}>Hi {name} 👋</Text>
      </View>
      <TouchableOpacity 
        style={styles.notificationButton} 
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Bell size={scale(24)} color="#fff" />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
    marginBottom: normalize(20),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  greeting: {
    ...TYPOGRAPHY.h2,
    color: '#fff',
    fontSize: normalize(20),
    fontWeight: '700',
  },
  notificationButton: {
    width: scale(44),
    height: scale(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(10),
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#000',
  },
});
