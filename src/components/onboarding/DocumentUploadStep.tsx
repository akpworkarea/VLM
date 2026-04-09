import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { UploadItem } from '@/src/components/ui/UploadItem';
import { normalize } from '@/src/utils/responsive';
import { 
  CreditCard, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  UserCircle 
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface DocumentUploadStepProps {
  documents: any;
  onUpload: (id: string) => void;
}

const docTypes = [
  { id: 'aadhaar', label: 'Aadhaar Card', subLabel: 'Upload Image or PDF (Front & Back)', icon: CreditCard },
  { id: 'qualification', label: 'Qualification Certificate', subLabel: 'Upload Highest Degree or Marklist', icon: GraduationCap },
  { id: 'experience', label: 'Experience Document', subLabel: 'Upload Work Experience Letter', icon: Briefcase },
  { id: 'resume', label: 'Resume or CV', subLabel: 'Upload Updated Resume/CV', icon: FileText },
  { id: 'photo', label: 'Profile Photo', subLabel: 'Formal Professional Photo', icon: UserCircle },
];

export const DocumentUploadStep = ({ documents, onUpload }: DocumentUploadStepProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {docTypes.map((doc, index) => (
          <Animated.View 
            key={doc.id} 
            entering={FadeInDown.delay(index * 100).duration(500)}
          >
            <UploadItem 
              label={doc.label}
              subLabel={doc.subLabel}
              icon={doc.icon}
              status={documents[doc.id]?.status || 'pending'}
              progress={documents[doc.id]?.progress || 0}
              onPress={() => onUpload(doc.id)}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  list: {
    paddingBottom: normalize(20),
  },
});
