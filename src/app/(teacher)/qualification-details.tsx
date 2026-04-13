import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  withSpring
} from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { StepIndicator } from '@/src/components/ui/StepIndicator';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Input } from '@/src/components/ui/Input';
import { Dropdown } from '@/src/components/ui/Dropdown';
import { Button } from '@/src/components/ui/Button';
import { ToggleSwitch } from '@/src/components/ui/ToggleSwitch';
import { FileUploadGrid } from '@/src/components/ui/FileUploadGrid';
import * as ImagePicker from 'expo-image-picker';
import { GraduationCap, School, Calendar, Award, FileUp, ArrowRight } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { glassStyles } from '@/src/theme/glassStyles';

export default function QualificationDetailsScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    highestQualification: '',
    instituteName: '',
    passingYear: '',
    teachingCertification: '',
    hasBEd: false,
    additionalCertificates: [] as string[],
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCertificate = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = result.assets[0].uri.split('/').pop() || 'Certificate.jpg';
      updateField('additionalCertificates', [...formData.additionalCertificates, fileName]);
    }
  };

  const handleRemoveCertificate = (index: number) => {
    const newCerts = [...formData.additionalCertificates];
    newCerts.splice(index, 1);
    updateField('additionalCertificates', newCerts);
  };

  const handleContinue = () => {
    console.log('Qualification Details Submitted:', formData);
    router.push('/experience-details');
  };

  const Footer = (
    <Button 
      text="CONTINUE" 
      onPress={handleContinue} 
      icon={<ArrowRight size={normalize(20)} color="white" />}
      iconPosition="right"
    />
  );

  return (
    <ScreenWrapper footer={Footer}>
      <PageHeader subtitle="QUALIFICATION DETAILS" />
      <StepIndicator currentStep={2} totalSteps={7} />
      
      <GlassCard delay={300} style={styles.mainCard}>
        <Text style={styles.cardTitle}>Educational Background</Text>
        <Text style={styles.cardSubtitle}>Tell us about your academic achievements.</Text>
        
        <AnimatedInputWrapper delay={400}>
          <Dropdown 
            label="Highest Qualification"
            value={formData.highestQualification}
            options={[
              { label: 'Bachelors in Education', value: 'Bachelors in Education' },
              { label: 'Masters in Education', value: 'Masters in Education' },
              { label: 'PhD in Education', value: 'PhD in Education' },
              { label: 'Other', value: 'Other' }
            ]}
            onSelect={(v) => updateField('highestQualification', v)}
            placeholder="Select Qualification"
          />
        </AnimatedInputWrapper>

        <AnimatedInputWrapper delay={480}>
          <Input 
            label="Institute Name" 
            value={formData.instituteName} 
            onChangeText={(v) => updateField('instituteName', v)}
            icon={<School size={18} color={COLORS.textSecondary} />}
            placeholder="Enter Institute Name"
          />
        </AnimatedInputWrapper>

        <AnimatedInputWrapper delay={560}>
          <Input 
            label="Passing Year" 
            value={formData.passingYear} 
            onChangeText={(v) => updateField('passingYear', v)}
            icon={<Calendar size={18} color={COLORS.textSecondary} />}
            placeholder="YYYY"
            keyboardType="numeric"
          />
        </AnimatedInputWrapper>

        <AnimatedInputWrapper delay={640}>
          <Dropdown 
            label="Teaching Certification"
            value={formData.teachingCertification}
            options={[
              { label: 'NET', value: 'NET' },
              { label: 'SET', value: 'SET' },
              { label: 'TET', value: 'TET' },
              { label: 'CTET', value: 'CTET' },
              { label: 'None', value: 'None' }
            ]}
            onSelect={(v) => updateField('teachingCertification', v)}
            placeholder="Select Certification"
          />
        </AnimatedInputWrapper>

        <AnimatedInputWrapper delay={720}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleTextContainer}>
              <Text style={styles.toggleLabel}>B.Ed Qualification</Text>
              <Text style={styles.toggleSubtitle}>Do you have a B.Ed qualification?</Text>
            </View>
            <ToggleSwitch 
              value={formData.hasBEd}
              onValueChange={(v) => updateField('hasBEd', v)}
            />
          </View>
        </AnimatedInputWrapper>

        <AnimatedInputWrapper delay={800}>
          <FileUploadGrid 
            files={formData.additionalCertificates}
            onAdd={handleAddCertificate}
            onRemove={handleRemoveCertificate}
            onPressFile={(index) => console.log('View certificate:', formData.additionalCertificates[index])}
          />
        </AnimatedInputWrapper>
      </GlassCard>
    </ScreenWrapper>
  );
}

const AnimatedInputWrapper = ({ children, delay }: { children: React.ReactNode, delay: number }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: normalize(5),
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: normalize(13),
    textAlign: 'center',
    marginTop: normalize(6),
    marginBottom: normalize(25),
  },
  mainCard: {
    marginHorizontal: normalize(20),
  },
  toggleContainer: {
    ...glassStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
    height: normalize(68),
    marginBottom: normalize(16),
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleLabel: {
    color: '#fff',
    fontSize: normalize(12),
    fontWeight: '700',
    marginBottom: normalize(2),
  },
  toggleSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(10),
  },
});
