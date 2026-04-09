import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { LucideIcon, Upload, CheckCircle2, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

interface UploadItemProps {
  label: string;
  subLabel?: string;
  icon: LucideIcon;
  status: 'pending' | 'uploading' | 'completed';
  onPress: () => void;
  progress?: number;
}

export const UploadItem = ({ 
  label, 
  subLabel, 
  icon: Icon, 
  status, 
  onPress, 
  progress = 0 
}: UploadItemProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: withTiming(status === 'completed' ? COLORS.primary : 'rgba(255, 255, 255, 0.1)', { duration: 300 }),
    backgroundColor: withTiming(status === 'completed' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)', { duration: 300 }),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <View style={styles.iconContainer}>
          <Icon size={24} color={status === 'completed' ? COLORS.primary : 'rgba(255, 255, 255, 0.6)'} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
        </View>
        
        <View style={styles.statusContainer}>
          {status === 'completed' ? (
            <View style={styles.completedBadge}>
              <CheckCircle2 size={16} color={COLORS.primary} />
              <Text style={styles.completedText}>DONE</Text>
            </View>
          ) : status === 'uploading' ? (
            <View style={styles.uploadingBadge}>
              <Clock size={16} color={COLORS.secondary} />
              <Text style={styles.uploadingText}>{Math.round(progress * 100)}%</Text>
            </View>
          ) : (
            <View style={styles.uploadButton}>
              <Upload size={14} color="#fff" />
              <Text style={styles.uploadText}>UPLOAD</Text>
            </View>
          )}
          <Text style={[styles.statusText, status === 'completed' && styles.completedStatusText]}>
            {status.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
      
      {status === 'uploading' && (
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(20),
    borderWidth: 1,
    marginBottom: normalize(12),
    overflow: 'hidden',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
  },
  iconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(16),
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: normalize(15),
    fontWeight: '600',
  },
  subLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(11),
    marginTop: normalize(2),
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
    borderRadius: normalize(8),
    marginBottom: normalize(4),
  },
  uploadText: {
    color: '#fff',
    fontSize: normalize(10),
    fontWeight: '700',
    marginLeft: normalize(4),
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  completedText: {
    color: COLORS.primary,
    fontSize: normalize(10),
    fontWeight: '700',
    marginLeft: normalize(4),
  },
  uploadingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  uploadingText: {
    color: COLORS.secondary,
    fontSize: normalize(10),
    fontWeight: '700',
    marginLeft: normalize(4),
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: normalize(9),
    fontWeight: '700',
  },
  completedStatusText: {
    color: COLORS.primary,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});
