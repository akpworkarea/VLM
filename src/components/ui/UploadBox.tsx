import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FileText, Upload, CheckCircle, X } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
  SlideInUp
} from 'react-native-reanimated';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { ProgressBar } from './ProgressBar';

interface UploadBoxProps {
  onUpload: () => void;
  fileName?: string;
  isUploading?: boolean;
  progress?: number;
  onRemove?: () => void;
}

export const UploadBox = ({ 
  onUpload, 
  fileName, 
  isUploading = false, 
  progress = 0,
  onRemove 
}: UploadBoxProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (fileName || isUploading) {
    return (
      <Animated.View 
        entering={SlideInUp.duration(400)} 
        style={styles.fileCard}
      >
        <View style={styles.fileIconContainer}>
          <FileText size={24} color={COLORS.primary} />
        </View>
        <View style={styles.fileInfo}>
          <Text style={styles.fileName} numberOfLines={1}>{fileName || 'Uploading...'}</Text>
          {isUploading ? (
            <ProgressBar progress={progress} showPercentage />
          ) : (
            <View style={styles.successRow}>
              <CheckCircle size={14} color={COLORS.success} />
              <Text style={styles.successText}>Upload Complete</Text>
            </View>
          )}
        </View>
        {onRemove && !isUploading && (
          <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <X size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onUpload}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.dashedBox}
      >
        <View style={styles.iconWrapper}>
          <Upload size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Tap to Upload Resume</Text>
        <Text style={styles.subtitle}>PDF, DOCX, Max 10MB</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: normalize(10),
  },
  dashedBox: {
    width: '100%',
    height: normalize(140),
    borderRadius: normalize(20),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(20),
  },
  iconWrapper: {
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
  },
  title: {
    color: '#fff',
    fontSize: normalize(15),
    fontWeight: '600',
    marginBottom: normalize(4),
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(12),
  },
  fileCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: normalize(10),
  },
  fileIconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(16),
  },
  fileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fileName: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '600',
    marginBottom: normalize(4),
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successText: {
    color: COLORS.success,
    fontSize: normalize(12),
    marginLeft: normalize(4),
    fontWeight: '500',
  },
  removeBtn: {
    padding: normalize(8),
  },
});
