import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Camera, Image as ImageIcon, Bot, MessageCircle, PhoneCall } from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { SelectField } from '@/src/components/ui/SelectField';
import { TextAreaField } from '@/src/components/ui/TextAreaField';
import { UploadButton } from '@/src/components/ui/UploadButton';
import { OptionCard } from '@/src/components/ui/OptionCard';
import { Button } from '@/src/components/ui/Button';
import { useDoubt } from '@/src/hooks/useDoubt';
import { normalize, scale, wp } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function DoubtScreen() {
  const router = useRouter();
  const { 
    subjects, 
    chapters, 
    form, 
    setField, 
    submitDoubt, 
    isValid, 
    loading 
  } = useDoubt();

  const handleImageUpload = (type: 'camera' | 'gallery') => {
    if (form.images.length >= 3) {
      Alert.alert('Limit Reached', 'You can only attach up to 3 images.');
      return;
    }
    // Mock image upload
    const mockImage = `https://picsum.photos/seed/${Math.random()}/400/400`;
    setField('images', [...form.images, mockImage]);
  };

  const handleSubmit = async () => {
    try {
      const result = await submitDoubt();
      if (result?.success) {
        if (form.sessionType === 'ai') {
          router.push({
            pathname: '/ai-tutor',
            params: { initialQuestion: form.question }
          });
        } else {
          router.push({
            pathname: '/teacher-searching',
            params: { doubtId: result.id }
          });
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScreenWrapper noPadding>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={scale(24)} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ask Your Doubt</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={scale(24)} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <GlassCard style={styles.formCard}>
            <SelectField
              label="Select Subject"
              value={form.subjectId}
              options={subjects.map(s => ({ label: s.name, value: s.id }))}
              onSelect={(val) => setField('subjectId', val)}
              placeholder="Mathematics"
            />

            <SelectField
              label="Select Chapter"
              value={form.chapterId}
              options={chapters.map(c => ({ label: c.name, value: c.id }))}
              onSelect={(val) => setField('chapterId', val)}
              placeholder="Algebra"
              disabled={!form.subjectId}
            />

            <TextAreaField
              label="Type your detailed question here..."
              value={form.question}
              onChangeText={(text) => setField('question', text)}
              placeholder="Type your detailed question here..."
              maxLength={1000}
            />
          </GlassCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Attach Image (Optional)</Text>
            <Text style={styles.addedCount}>Added: {form.images.length}/3 images</Text>
          </View>
          
          <View style={styles.uploadRow}>
            <UploadButton 
              label="Take Photo" 
              icon={Camera} 
              onPress={() => handleImageUpload('camera')} 
            />
            <View style={{ width: normalize(16) }} />
            <UploadButton 
              label="Upload Image" 
              icon={ImageIcon} 
              onPress={() => handleImageUpload('gallery')} 
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Session Type</Text>
          <View style={styles.optionsRow}>
            <OptionCard
              title="AI Tutor"
              subtitle="Instant Help from AI"
              icon={Bot}
              selected={form.sessionType === 'ai'}
              onPress={() => setField('sessionType', 'ai')}
            />
            <View style={{ width: normalize(12) }} />
            <OptionCard
              title="Human Chat"
              subtitle="Expert Educator"
              icon={MessageCircle}
              selected={form.sessionType === 'chat'}
              onPress={() => setField('sessionType', 'chat')}
            />
            <View style={{ width: normalize(12) }} />
            <OptionCard
              title="Audio Call"
              subtitle="Live Discussion"
              icon={PhoneCall}
              selected={form.sessionType === 'call'}
              onPress={() => setField('sessionType', 'call')}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.footer}>
          <Button
            text="Submit Doubt"
            onPress={handleSubmit}
            disabled={!isValid || loading}
            loading={loading}
            glow={isValid}
          />
        </Animated.View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
    height: normalize(60),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    fontSize: normalize(18),
    fontWeight: '700',
  },
  notificationButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(40),
  },
  formCard: {
    padding: normalize(20),
    borderRadius: normalize(24),
  },
  section: {
    marginTop: normalize(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  sectionTitle: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '600',
    marginBottom: normalize(12),
  },
  addedCount: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: normalize(12),
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: normalize(32),
  },
});
