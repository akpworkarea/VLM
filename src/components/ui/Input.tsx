import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Animated as RNAnimated, KeyboardTypeOptions, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { glassStyles } from '@/src/theme/glassStyles';

interface InputProps {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  icon?: React.ReactNode;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
  editable?: boolean;
  maxLength?: number;
  style?: any;
  containerStyle?: any;
  noLabel?: boolean;
}

export const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  error, 
  icon,
  keyboardType,
  onPress,
  editable = true,
  maxLength,
  style,
  containerStyle,
  noLabel = false
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    if (!editable) return;
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

  const animatedGlowStyle = useAnimatedStyle(() => ({
    shadowOpacity: focusAnim.value * 0.3,
    shadowRadius: focusAnim.value * 10,
  }));

  const InputComponent = onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, containerStyle]}>
      {!noLabel && label && <Text style={styles.label}>{label}</Text>}
      <InputComponent onPress={onPress} activeOpacity={0.7}>
        <Animated.View style={[styles.inputContainer, animatedContainerStyle, animatedGlowStyle]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <TextInput
            style={[styles.input, style]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            secureTextEntry={secureTextEntry}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={keyboardType}
            editable={editable && !onPress}
            pointerEvents={onPress ? 'none' : 'auto'}
            maxLength={maxLength}
          />
        </Animated.View>
      </InputComponent>
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
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(56),
    paddingHorizontal: normalize(16),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
  },
  iconContainer: {
    marginRight: normalize(12),
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: normalize(16),
    height: '100%',
  },
  errorText: {
    color: COLORS.error,
    fontSize: normalize(12),
    marginTop: normalize(4),
  },
});
