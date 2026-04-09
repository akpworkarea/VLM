import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Play, Video as VideoIcon, Camera as CameraIcon, RefreshCw } from 'lucide-react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { CameraView, CameraType } from 'expo-camera';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { Button } from './Button';

interface VideoPreviewProps {
  videoUri: string | null;
  duration: number;
  isRecording: boolean;
  onRecord: () => void;
  onStop: () => void;
  onUpload: () => void;
  onReset: () => void;
  cameraRef: React.RefObject<any>;
  cameraFacing: CameraType;
  onToggleCamera: () => void;
}

export const VideoPreview = ({ 
  videoUri, 
  duration, 
  isRecording, 
  onRecord, 
  onStop, 
  onUpload, 
  onReset,
  cameraRef,
  cameraFacing,
  onToggleCamera
}: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize expo-video player
  // useVideoPlayer handles the lifecycle automatically
  const player = useVideoPlayer(videoUri || '', (player) => {
    player.loop = true;
  });

  // Sync isPlaying state with player status
  // Sync isPlaying state with player status
useEffect(() => {
  const subscription = player.addListener('playingChange', ({ isPlaying: isPlayingValue }) => {
    setIsPlaying(isPlayingValue);
  });
  return () => {
    subscription.remove();
  };
}, [player]);

  // Reset isPlaying when videoUri changes
  useEffect(() => {
    setIsPlaying(false);
  }, [videoUri]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    try {
      if (player.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewBox}>
        {videoUri ? (
          <VideoView
            player={player}
            style={styles.video}
            contentFit="cover"
            nativeControls={false}
          />
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.video}
            mode="video"
            facing={cameraFacing}
          >
            {!isRecording && (
              <>
                <View style={styles.placeholderOverlay}>
                  <VideoIcon size={normalize(48)} color="rgba(255,255,255,0.2)" />
                </View>
                <TouchableOpacity 
                  style={styles.switchButton} 
                  onPress={onToggleCamera}
                >
                  <RefreshCw size={normalize(20)} color="white" />
                </TouchableOpacity>
              </>
            )}
          </CameraView>
        )}

        {!isRecording && !isPlaying && videoUri && (
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={handlePlay}
          >
            <Play size={normalize(32)} color="white" fill="white" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
        )}

        {isRecording && (
          <View style={styles.recordingOverlay}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>REC {formatDuration(duration)}</Text>
          </View>
        )}
      </View>

      <Text style={styles.label}>VIDEO PREVIEW</Text>
      <Text style={styles.duration}>Current Duration: {formatDuration(duration)}</Text>
      
      <Text style={styles.maxDuration}>
        Maximum Duration: 180 Seconds (3 Minutes)
      </Text>

      <View style={styles.buttonRow}>
        {!videoUri ? (
          <>
            <View style={styles.buttonContainer}>
              <Button 
                text="UPLOAD" 
                onPress={onUpload}
                variant="outline"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                text={isRecording ? "STOP" : "RECORD NOW"} 
                onPress={isRecording ? onStop : onRecord}
                variant="primary"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Button 
                text="UPLOAD" 
                onPress={onUpload}
                variant="outline"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                text="RETAKE" 
                onPress={onReset}
                variant="primary"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  previewBox: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: normalize(16),
    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  placeholder: {
    opacity: 0.5,
  },
  switchButton: {
    position: 'absolute',
    bottom: normalize(12),
    right: normalize(12),
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: normalize(10),
    borderRadius: normalize(25),
  },
  playButton: {
    alignItems: 'center',
    gap: normalize(8),
  },
  playText: {
    ...TYPOGRAPHY.body,
    color: 'white',
    fontWeight: '600',
  },
  label: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    marginBottom: normalize(4),
  },
  duration: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: normalize(20),
  },
  maxDuration: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: normalize(20),
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: normalize(10),
    width: '100%',
    paddingHorizontal: normalize(4),
  },
  buttonContainer: {
    flex: 1,
  },
  actionButton: {
    flex: 1,
    height: normalize(48),
  },
  recordingOverlay: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    borderRadius: normalize(20),
    gap: normalize(6),
  },
  recordingDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: COLORS.error,
  },
  recordingText: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '700',
  },
});
