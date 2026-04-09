import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { File, Plus, X } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface UploadCardProps {
  isAdd?: boolean;
  fileName?: string;
  onPress: () => void;
  onRemove?: () => void;
  delay?: number;
}

export const UploadCard = ({ isAdd, fileName, onPress, onRemove, delay = 0 }: UploadCardProps) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 400, easing: Easing.out(Easing.exp) }));
    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 150 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getFileIcon = () => {
    if (fileName?.toLowerCase().endsWith('.pdf')) return <File size={20} color="#fbbf24" />;
    return <File size={20} color="#fbbf24" />;
  };

  if (isAdd) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.addBtn}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        <View style={styles.fileContent}>
          {getFileIcon()}
          <Text style={styles.fileName} numberOfLines={1}>{fileName}</Text>
        </View>
        {onRemove && (
          <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
            <X size={10} color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(8),
  },
  fileContent: {
    alignItems: 'center',
    width: '100%',
  },
  fileName: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: normalize(8),
    fontWeight: '500',
    marginTop: normalize(6),
    textAlign: 'center',
  },
  removeBtn: {
    position: 'absolute',
    top: normalize(-5),
    right: normalize(-5),
    backgroundColor: COLORS.error,
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  addBtn: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
