import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { LucideIcon } from 'lucide-react-native';

interface ChipOption {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface ChipGroupProps {
  options: ChipOption[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  multiSelect?: boolean;
  horizontal?: boolean;
}

export const ChipGroup = ({ 
  options, 
  selectedIds, 
  onSelect, 
  multiSelect = false,
  horizontal = false
}: ChipGroupProps) => {
  const Container = horizontal ? ScrollView : View;

  return (
    <Container 
      horizontal={horizontal} 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontal ? styles.horizontalContent : styles.gridContent}
      style={horizontal ? styles.horizontalContainer : styles.gridContainer}
    >
      {options.map((option) => (
        <Chip 
          key={option.id}
          option={option}
          isSelected={selectedIds.includes(option.id)}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </Container>
  );
};

interface ChipProps {
  option: ChipOption;
  isSelected: boolean;
  onPress: () => void;
  key?: string;
}

const Chip = ({ option, isSelected, onPress }: ChipProps) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    glowOpacity.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: withTiming(isSelected ? COLORS.primary : 'rgba(255, 255, 255, 0.1)', { duration: 300 }),
    backgroundColor: withTiming(isSelected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)', { duration: 300 }),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const Icon = option.icon;

  return (
    <Animated.View style={[styles.chipWrapper, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.chip}
      >
        {isSelected && (
          <Animated.View style={[StyleSheet.absoluteFill, glowStyle]}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.2)', 'transparent']}
              style={styles.gradient}
            />
          </Animated.View>
        )}
        <View style={styles.content}>
          {Icon && <Icon size={16} color={isSelected ? COLORS.primary : COLORS.textSecondary} style={styles.icon} />}
          <Text style={[styles.label, isSelected && styles.selectedLabel]}>{option.label}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(10),
  },
  horizontalContainer: {
    width: '100%',
  },
  horizontalContent: {
    flexDirection: 'row',
    paddingRight: normalize(20),
    gap: normalize(10),
  },
  chipWrapper: {
    borderRadius: normalize(20),
    borderWidth: 1,
    overflow: 'hidden',
  },
  chip: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
    minWidth: normalize(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: normalize(8),
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: normalize(13),
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
