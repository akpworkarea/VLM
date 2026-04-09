import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { UploadCard } from './UploadCard';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { FileUp } from 'lucide-react-native';

interface FileUploadGridProps {
  files: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onPressFile?: (index: number) => void;
}

export const FileUploadGrid = ({ files, onAdd, onRemove, onPressFile }: FileUploadGridProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FileUp size={20} color="#fbbf24" />
        </View>
        <View>
          <Text style={styles.title}>Additional Certificates</Text>
          <Text style={styles.subtitle}>Upload Additional Certificates</Text>
        </View>
      </View>
      
      <View style={styles.grid}>
        {files.map((file, index) => (
          <View key={index} style={styles.cardWrapper}>
            <UploadCard 
              fileName={file} 
              onPress={() => onPressFile?.(index)} 
              onRemove={() => onRemove(index)}
              delay={index * 100}
            />
          </View>
        ))}
        <View style={styles.addBtnWrapper}>
          <UploadCard 
            isAdd 
            onPress={onAdd} 
            delay={files.length * 100}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(10),
    marginBottom: normalize(20),
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: normalize(16),
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  iconContainer: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(10),
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  title: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(10),
    marginTop: normalize(2),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: normalize(10),
  },
  cardWrapper: {
    width: '30%',
    aspectRatio: 1,
  },
  addBtnWrapper: {
    position: 'absolute',
    bottom: normalize(-10),
    right: normalize(10),
  },
});
