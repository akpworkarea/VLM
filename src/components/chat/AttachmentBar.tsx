import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Paperclip, Image as ImageIcon } from 'lucide-react-native';
import { normalize, scale } from '@/src/utils/responsive';

interface AttachmentBarProps {
  onImage: () => void;
}

export const AttachmentBar = ({ onImage }: AttachmentBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Paperclip size={scale(20)} color="rgba(255, 255, 255, 0.6)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onImage}>
        <ImageIcon size={scale(20)} color="rgba(255, 255, 255, 0.6)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  button: {
    padding: normalize(8),
  },
  recordingButton: {
    backgroundColor: '#EF4444',
    borderRadius: scale(20),
  },
});
