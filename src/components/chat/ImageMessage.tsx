import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { normalize, scale } from '@/src/utils/responsive';

interface ImageMessageProps {
  uri: string;
}

export const ImageMessage = ({ uri }: ImageMessageProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <Image 
        source={{ uri }} 
        style={styles.image} 
        resizeMode="cover"
        referrerPolicy="no-referrer"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(200),
    height: scale(150),
    borderRadius: normalize(12),
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
