import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { glassStyles } from '@/src/theme/glassStyles';

interface TextAreaFieldProps {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  style?: any;
  containerStyle?: any;
}

export const TextAreaField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  error, 
  maxLength = 1000,
  style,
  containerStyle,
}: TextAreaFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 200 });
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusAnim.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.2)', COLORS.primary]
    ),
    backgroundColor: interpolateColor(
      focusAnim.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.08)']
    ),
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputContainer, animatedContainerStyle]}>
        <TextInput
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          maxLength={maxLength}
        />
        <Text style={styles.counter}>{value.length} / {maxLength}</Text>
      </Animated.View>
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
  inputContainer: {
    ...glassStyles.input,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    minHeight: normalize(120),
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: normalize(16),
    textAlignVertical: 'top',
  },
  counter: {
    alignSelf: 'flex-end',
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: normalize(10),
    marginTop: normalize(4),
  },
  errorText: {
    color: COLORS.error,
    fontSize: normalize(12),
    marginTop: normalize(4),
  },
});
