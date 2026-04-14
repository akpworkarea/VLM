import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize, scale } from '@/src/utils/responsive';

interface UploadButtonProps {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  containerStyle?: any;
}

export const UploadButton = ({ label, icon: Icon, onPress, containerStyle }: UploadButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Icon size={scale(20)} color={COLORS.cyan} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: normalize(48),
    borderRadius: normalize(24),
    borderWidth: 1,
    borderColor: COLORS.cyan,
    backgroundColor: 'rgba(34, 211, 238, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: normalize(8),
  },
  label: {
    color: COLORS.cyan,
    fontSize: normalize(14),
    fontWeight: '600',
  },
});
