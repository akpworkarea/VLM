import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { glassStyles } from '@/src/theme/glassStyles';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export const Dropdown = ({ label, value, options, onSelect, error, placeholder = 'Select option' }: DropdownProps) => {
  const [visible, setVisible] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={[styles.dropdown, error ? styles.errorBorder : null]} 
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.valueText, !selectedOption && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.option} 
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={[styles.optionText, item.value === value && styles.selectedOptionText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  dropdown: {
    ...glassStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: normalize(56),
    paddingHorizontal: normalize(16),
  },
  valueText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    ...glassStyles.container,
    width: '80%',
    backgroundColor: '#1e1b4b',
    padding: normalize(10),
    maxHeight: '50%',
  },
  option: {
    padding: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  optionText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: '700',
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
