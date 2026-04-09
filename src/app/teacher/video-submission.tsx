import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Info, ArrowRight } from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { Header } from '@/src/components/layout/Header';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { VideoPreview } from '@/src/components/ui/VideoPreview';
import { SubjectCard } from '@/src/components/ui/SubjectCard';
import { Button } from '@/src/components/ui/Button';
import { useVideoRecorder } from '@/src/hooks/useVideoRecorder';
import { MOCK_SUBJECTS } from '@/src/mock/subject.mock';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { SPACING } from '@/src/constants/spacing';
import apiClient from '@/src/services/apiClient';
import { ENDPOINTS } from '@/src/services/endpoints';

import { StepIndicator } from '@/src/components/ui/StepIndicator';

export default function VideoSubmissionScreen() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    video, 
    isRecording, 
    duration, 
    startRecording, 
    stopRecording, 
    uploadVideo, 
    resetVideo,
    cameraRef,
    facing,
    toggleFacing
  } = useVideoRecorder();

  const handleSubmit = async () => {
    if (!video || !selectedSubject) {
      Alert.alert('Error', 'Please provide a video and select a subject.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Demo: Simulating API call
      console.log('Submitting video for subject:', selectedSubject);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Your video has been submitted for review!');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit video. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Footer = (
    <Button 
      text={isSubmitting ? "SUBMITTING..." : "SUBMIT FOR REVIEW"} 
      onPress={handleSubmit}
      disabled={!video || !selectedSubject || isSubmitting}
      icon={<ArrowRight size={normalize(20)} color="white" />}
    />
  );

  return (
    <ScreenWrapper footer={Footer}>
      <Header />
      
      <View style={styles.content}>
        <StepIndicator currentStep={5} totalSteps={5} />

        {/* Instructions Card */}
        <GlassCard delay={200} style={styles.card}>
          <View style={styles.instructionHeader}>
            <Info size={normalize(18)} color={COLORS.textSecondary} />
            <Text style={styles.instructionTitle}>INSTRUCTIONS:</Text>
          </View>
          <Text style={styles.instructionText}>
            To verify your teaching style, please:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Solve one representative question from your subject.</Text>
            <Text style={styles.bulletItem}>• Clearly explain your teaching methodology and reasoning.</Text>
            <Text style={styles.bulletItem}>• Ensure high audio and video quality.</Text>
          </View>
        </GlassCard>

        {/* Video Preview Card */}
        <GlassCard delay={400} style={styles.card}>
          <VideoPreview 
            videoUri={video?.uri || null}
            duration={video?.duration || duration}
            isRecording={isRecording}
            onRecord={startRecording}
            onStop={stopRecording}
            onUpload={uploadVideo}
            onReset={resetVideo}
            cameraRef={cameraRef}
            cameraFacing={facing}
            onToggleCamera={toggleFacing}
          />
        </GlassCard>

        {/* Subject Selection */}
        <View style={styles.subjectSection}>
          <Text style={styles.sectionTitle}>SELECT SUBJECT FOR VIDEO</Text>
          <View style={styles.subjectGrid}>
            {MOCK_SUBJECTS.map((subject) => (
              <SubjectCard 
                key={subject.id}
                id={subject.id}
                name={subject.name}
                icon={subject.icon}
                isSelected={selectedSubject === subject.id}
                onPress={(id) => setSelectedSubject(id)}
              />
            ))}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: normalize(10),
  },
  card: {
    marginHorizontal: normalize(20),
    marginBottom: normalize(20),
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
    marginBottom: normalize(12),
  },
  instructionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textSecondary,
    fontSize: normalize(14),
    letterSpacing: 1,
  },
  instructionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontSize: normalize(13),
    marginBottom: normalize(8),
  },
  bulletList: {
    gap: normalize(4),
  },
  bulletItem: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontSize: normalize(13),
    lineHeight: normalize(18),
  },
  subjectSection: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(10),
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    fontSize: normalize(15),
    fontWeight: '700',
    marginBottom: normalize(16),
    letterSpacing: 0.5,
  },
  subjectGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
});
