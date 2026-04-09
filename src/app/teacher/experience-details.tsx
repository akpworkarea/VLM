import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  withSpring
} from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { Header } from '@/src/components/layout/Header';
import { StepIndicator } from '@/src/components/ui/StepIndicator';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { StepperSelector } from '@/src/components/ui/StepperSelector';
import { ChipGroup } from '@/src/components/ui/ChipGroup';
import { UploadBox } from '@/src/components/ui/UploadBox';
import { Monitor, Users, Layers, GraduationCap, Home, Globe } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';

export default function ExperienceDetailsScreen() {
  const [formData, setFormData] = useState({
    years: 5,
    months: 8,
    teachingMode: ['online'],
    experienceType: ['school'],
    resume: null as { name: string, size: number } | null,
    summary: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModeSelect = (id: string) => {
    const current = [...formData.teachingMode];
    if (current.includes(id)) {
      updateField('teachingMode', current.filter(i => i !== id));
    } else {
      updateField('teachingMode', [...current, id]);
    }
  };

  const handleTypeSelect = (id: string) => {
    const current = [...formData.experienceType];
    if (current.includes(id)) {
      updateField('experienceType', current.filter(i => i !== id));
    } else {
      updateField('experienceType', [...current, id]);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload
    let p = 0;
    const interval = setInterval(() => {
      p += 0.1;
      setUploadProgress(p);
      if (p >= 1) {
        clearInterval(interval);
        setIsUploading(false);
        updateField('resume', { name: 'Resume_Teacher.pdf', size: 1024 * 1024 * 2 });
      }
    }, 200);
  };

  const handleRemoveResume = () => {
    updateField('resume', null);
  };

  const handleSave = () => {
    console.log('Experience Details Saved:', formData);
  };

  const Footer = (
    <Button 
      text="SAVE & CONTINUE" 
      onPress={handleSave} 
      icon={true}
    />
  );

  const teachingModes = [
    { id: 'online', label: 'Online', icon: Globe },
    { id: 'offline', label: 'Offline', icon: Users },
    { id: 'hybrid', label: 'Hybrid', icon: Layers },
  ];

  const experienceTypes = [
    { id: 'school', label: 'School', icon: GraduationCap },
    { id: 'home', label: 'Home Tuition', icon: Home },
    { id: 'platform', label: 'Online Platform', icon: Monitor },
  ];

  return (
    <ScreenWrapper footer={Footer}>
      <Header title="Experience Details" />
      <StepIndicator currentStep={3} totalSteps={5} />
      
      <AnimatedCardWrapper delay={300}>
        <GlassCard noPadding>
          <View style={styles.cardPadding}>
            <Text style={styles.sectionTitle}>Total Experience</Text>
            <View style={styles.stepperRow}>
              <StepperSelector 
                label="Years" 
                value={formData.years} 
                onValueChange={(v) => updateField('years', v)} 
              />
              <StepperSelector 
                label="Months" 
                value={formData.months} 
                onValueChange={(v) => updateField('months', v)} 
                max={11}
              />
            </View>
          </View>
        </GlassCard>
      </AnimatedCardWrapper>

      <AnimatedCardWrapper delay={420}>
        <GlassCard noPadding>
          <View style={styles.cardPadding}>
            <Text style={styles.sectionTitle}>Teaching Mode</Text>
            <ChipGroup 
              options={teachingModes} 
              selectedIds={formData.teachingMode} 
              onSelect={handleModeSelect}
              multiSelect
              horizontal
            />
          </View>
        </GlassCard>
      </AnimatedCardWrapper>

      <AnimatedCardWrapper delay={540}>
        <GlassCard noPadding>
          <View style={styles.cardPadding}>
            <Text style={styles.sectionTitle}>Type of Experience</Text>
            <ChipGroup 
              options={experienceTypes} 
              selectedIds={formData.experienceType} 
              onSelect={handleTypeSelect}
              multiSelect
              horizontal
            />
          </View>
        </GlassCard>
      </AnimatedCardWrapper>

      <AnimatedCardWrapper delay={660}>
        <GlassCard noPadding>
          <View style={styles.cardPadding}>
            <Text style={styles.sectionTitle}>Resume Upload</Text>
            <UploadBox 
              onUpload={handleUpload}
              fileName={formData.resume?.name}
              isUploading={isUploading}
              progress={uploadProgress}
              onRemove={handleRemoveResume}
            />
          </View>
        </GlassCard>
      </AnimatedCardWrapper>

      <AnimatedCardWrapper delay={780}>
        <GlassCard noPadding>
          <View style={styles.cardPadding}>
            <Text style={styles.sectionTitle}>Short Experience Summary</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Tell us about your teaching journey..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                multiline
                value={formData.summary}
                onChangeText={(v) => updateField('summary', v)}
                textAlignVertical="top"
              />
            </View>
          </View>
        </GlassCard>
      </AnimatedCardWrapper>
    </ScreenWrapper>
  );
}

const AnimatedCardWrapper = ({ children, delay }: { children: React.ReactNode, delay: number }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: normalize(20),
    marginBottom: normalize(16),
  },
  cardPadding: {
    padding: normalize(20),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: normalize(15),
    fontWeight: '700',
    marginBottom: normalize(16),
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: normalize(12),
    minHeight: normalize(100),
  },
  textInput: {
    color: '#fff',
    fontSize: normalize(14),
    flex: 1,
  },
});
