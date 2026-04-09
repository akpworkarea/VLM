import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

interface AvatarUploadProps {
  image?: string;
  onImageChange: (uri: string) => void;
}

export const AvatarUpload = ({ image, onImageChange }: AvatarUploadProps) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Camera size={32} color={COLORS.textSecondary} />
          </View>
        )}
        <View style={styles.editBadge}>
          <Camera size={14} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.hint}>Tap to upload photo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: normalize(30),
  },
  avatarContainer: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(50),
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.bgMain,
  },
  hint: {
    color: COLORS.textSecondary,
    fontSize: normalize(12),
    marginTop: normalize(8),
  },
});
