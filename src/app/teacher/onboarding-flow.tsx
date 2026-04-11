import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSequence,
  interpolate,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
import { ArrowRight } from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { StepIndicator } from '@/src/components/ui/StepIndicator';
import { Button } from '@/src/components/ui/Button';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

// Steps
import { LanguageStep } from '@/src/components/onboarding/LanguageStep';
import { BoardStep } from '@/src/components/onboarding/BoardStep';
import { ClassStep } from '@/src/components/onboarding/ClassStep';
import { ClassGroupStep } from '@/src/components/onboarding/ClassGroupStep';
import { SubjectStep } from '@/src/components/onboarding/SubjectStep';
import { DocumentUploadStep } from '@/src/components/onboarding/DocumentUploadStep';

const { width } = Dimensions.get('window');

const SUB_STEPS = [
  'Language',
  'Board',
  'Class',
  'Group',
  'Subject',
  'Documents'
];

export default function OnboardingFlowScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form Data
  const [formData, setFormData] = useState({
    languages: [] as string[],
    board: '',
    classes: [] as string[],
    groups: [] as string[],
    subjects: [] as string[],
    documents: {} as any,
  });

  // Animation Shared Values
  const blurIntensity = useSharedValue(0);
  const currentOpacity = useSharedValue(1);
  const currentTranslateY = useSharedValue(0);

  const handleStepChange = useCallback((stepIndex: number) => {
    if (stepIndex === currentStep) return;
    
    // Animate blur
    blurIntensity.value = withSequence(
      withTiming(15, { duration: 200 }),
      withTiming(0, { duration: 200 })
    );

    const easing = Easing.out(Easing.cubic);

    // 1. Exit Animation
    currentOpacity.value = withTiming(0, { duration: 350, easing }, (finished) => {
      if (finished) {
        // 2. Update State
        runOnJS(setCurrentStep)(stepIndex);
        
        // 3. Prepare for Entry
        currentTranslateY.value = 30;
        
        // 4. Entry Animation
        currentOpacity.value = withTiming(1, { duration: 450, easing });
        currentTranslateY.value = withTiming(0, { duration: 450, easing });
      }
    });
    currentTranslateY.value = withTiming(-20, { duration: 350, easing });
    
  }, [currentStep]);

  const handleContinue = () => {
    if (currentStep < SUB_STEPS.length - 1) {
      handleStepChange(currentStep + 1);
    } else {
      console.log('Final Submission:', formData);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleItem = (field: string, id: string) => {
    const current = [...(formData as any)[field]];
    if (current.includes(id)) {
      updateFormData(field, current.filter(i => i !== id));
    } else {
      updateFormData(field, [...current, id]);
    }
  };

  const handleDocumentUpload = (id: string) => {
    setFormData(prev => {
      const currentDocs = { ...prev.documents };
      currentDocs[id] = { status: 'uploading', progress: 0 };
      return { ...prev, documents: currentDocs };
    });
    
    // Simulate upload
    let p = 0;
    const interval = setInterval(() => {
      p += 0.1;
      
      setFormData(prev => {
        const updatedDocs = { ...prev.documents };
        if (p >= 1) {
          clearInterval(interval);
          updatedDocs[id] = { status: 'completed', progress: 1 };
        } else {
          updatedDocs[id] = { status: 'uploading', progress: p };
        }
        return { ...prev, documents: updatedDocs };
      });
    }, 200);
  };

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(blurIntensity.value, [0, 20], [0, 1]),
  }));

  const currentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: currentOpacity.value,
    transform: [
      { translateY: currentTranslateY.value }
    ] as any,
    position: 'absolute',
    width: '100%',
  }));

  const renderStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <LanguageStep selectedLanguages={formData.languages} onSelect={(id) => toggleItem('languages', id)} />;
      case 1:
        return <BoardStep selectedBoard={formData.board} onSelect={(id) => updateFormData('board', id)} />;
      case 2:
        return <ClassStep selectedClasses={formData.classes} onSelect={(id) => toggleItem('classes', id)} />;
      case 3:
        return <ClassGroupStep selectedGroups={formData.groups} onSelect={(id) => toggleItem('groups', id)} />;
      case 4:
        return <SubjectStep selectedSubjects={formData.subjects} onSelect={(id) => toggleItem('subjects', id)} />;
      case 5:
        return <DocumentUploadStep documents={formData.documents} onUpload={handleDocumentUpload} />;
      default:
        return null;
    }
  };

  const Footer = (
    <Button 
      text={currentStep === SUB_STEPS.length - 1 ? "SUBMIT FOR VERIFICATION" : "CONTINUE"} 
      onPress={handleContinue} 
      icon={<ArrowRight size={normalize(20)} color="white" />}
      iconPosition="right"
    />
  );

  return (
    <ScreenWrapper footer={Footer}>
      <PageHeader subtitle="QUALIFICATION DETAILS" />
      <StepIndicator 
        currentStep={4} 
        totalSteps={5} 
      />
      
      <View style={styles.stepContainer}>
        <Animated.View style={currentAnimatedStyle}>
          {renderStep(currentStep)}
        </Animated.View>

        <AnimatedBlurView 
          intensity={20} 
          tint="dark" 
          style={[StyleSheet.absoluteFill, blurStyle, { pointerEvents: 'none' }]} 
        />
      </View>
      
      <View style={{ height: normalize(100) }} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    minHeight: normalize(500),
  },
});
