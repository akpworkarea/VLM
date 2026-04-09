import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Video as VideoIcon, Play, Square, RefreshCcw, Upload } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import { Video } from '@/src/models/video.model';

export const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [video, setVideo] = useState<Video | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;
    
    try {
      if (!cameraPermission?.granted || !microphonePermission?.granted) {
        const cam = await requestCameraPermission();
        const mic = await requestMicrophonePermission();
        if (!cam.granted || !mic.granted) {
          Alert.alert('Permission required', 'Camera and microphone permissions are needed to record video.');
          return;
        }
      }

      setIsRecording(true);
      setDuration(0);
      
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          if (prev >= 180) {
            stopRecording();
            return 180;
          }
          return prev + 1;
        });
      }, 1000);

      const videoData = await cameraRef.current.recordAsync({
        maxDuration: 180,
      });

      if (videoData) {
        setVideo({
          id: Date.now().toString(),
          uri: videoData.uri,
          duration: duration,
          type: 'recorded',
        });
      }
    } catch (error) {
      console.error('Recording error:', error);
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current || !isRecording) return;
    
    try {
      cameraRef.current.stopRecording();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const uploadVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        // In a real app, we'd check duration here using video metadata
        // For now, we'll assume it's valid or handle it in the preview
        setVideo({
          id: Date.now().toString(),
          uri: asset.uri,
          duration: 0, // Placeholder
          type: 'uploaded',
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const resetVideo = () => {
    setVideo(null);
    setDuration(0);
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return {
    isRecording,
    duration,
    video,
    facing,
    permission: cameraPermission?.granted && microphonePermission?.granted,
    cameraRef,
    startRecording,
    stopRecording,
    uploadVideo,
    resetVideo,
    toggleFacing,
  };
};
