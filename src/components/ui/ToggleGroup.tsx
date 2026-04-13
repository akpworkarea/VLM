import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface ToggleGroupProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  label?: string;
}

export const ToggleGroup = ({ options, value, onSelect, label }: ToggleGroupProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.group}>
        {options.map((option) => {
          const isSelected = value === option.toLowerCase();
          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => onSelect(option.toLowerCase())}
            >
              <Text style={[styles.optionText, isSelected && styles.selectedText]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: normalize(14),
    marginBottom: normalize(8),
    fontWeight: '500',
  },
  group: {
    flexDirection: 'row',
    gap: normalize(10),
  },
  option: {
    flex: 1,
    paddingVertical: normalize(12),
    alignItems: 'center',
    borderRadius: normalize(12),
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedOption: {
    backgroundColor: 'transparent',
    borderColor: COLORS.cyan,
    borderWidth: 2,
  },
  optionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(14),
    fontWeight: '600',
  },
  selectedText: {
    color: COLORS.cyan,
    fontWeight: '700',
  },
});
