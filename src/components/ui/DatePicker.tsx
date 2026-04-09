import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface DatePickerProps {
  label: string;
  value: string;
  onSelect: (date: string) => void;
  error?: string;
}

export const DatePicker = ({ label, value, onSelect, error }: DatePickerProps) => {
  // Simple mock of a date picker for this demo
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={[styles.picker, error ? styles.errorBorder : null]} 
        onPress={() => console.log('Open Date Picker')}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value || 'Select date'}
        </Text>
        <Calendar size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
    width: '100%',
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: normalize(14),
    marginBottom: normalize(8),
    fontWeight: '500',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: normalize(56),
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: normalize(16),
  },
  valueText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: normalize(12),
    marginTop: normalize(4),
  },
});
