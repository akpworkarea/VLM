import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { InputField } from '@/src/components/ui/InputField';
import { SelectField } from '@/src/components/ui/SelectField';
import { ToggleGroup } from '@/src/components/ui/ToggleGroup';
import { Chip } from '@/src/components/ui/Chip';
import { Button } from '@/src/components/ui/Button';
import { normalize, wp, hp, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { useStudentProfile } from '@/src/hooks/useStudentProfile';
import { User, GraduationCap, MapPin, BookOpen, Star, ChevronLeft, Phone } from 'lucide-react-native';
import { GlassCard } from '@/src/components/ui/GlassCard';

const CLASS_OPTIONS = [
  { label: 'Class 9', value: '9' },
  { label: 'Class 10', value: '10' },
  { label: 'Class 11', value: '11' },
  { label: 'Class 12', value: '12' },
];

const BOARD_OPTIONS = [
  { label: 'CBSE', value: 'cbse' },
  { label: 'ICSE', value: 'icse' },
  { label: 'State Board', value: 'state' },
];

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'English', 'History', 'Geography', 'Economics'
];

export default function StudentProfileScreen() {
  const router = useRouter();
  const { createProfile, loading } = useStudentProfile();
  
  const [form, setForm] = useState({
    fullName: '',
    nickname: '',
    class: '',
    board: '',
    medium: 'english',
    city: '',
    state: '',
    parentPhone: '',
    preferredSubjects: [] as string[],
    weakSubjects: [] as string[],
  });

  const toggleSubject = (subject: string, type: 'preferred' | 'weak') => {
    const key = type === 'preferred' ? 'preferredSubjects' : 'weakSubjects';
    const current = form[key];
    if (current.includes(subject)) {
      setForm({ ...form, [key]: current.filter(s => s !== subject) });
    } else {
      setForm({ ...form, [key]: [...current, subject] });
    }
  };

  const handleContinue = async () => {
    const success = await createProfile(form as any);
    if (success) {
      router.push('/(student)/subscription-plan');
    }
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={scale(24)} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleGroup}>
          <Text style={styles.headerTitle}>Create Your Profile</Text>
          <Text style={styles.headerSubtitle}>
            VLM Academy Onboarding Welcome to the VLM, advanced student learning platform. India's number one platform for learning.
          </Text>
        </View>
      </View>

      {/* Personal Details */}
      <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
          </View>
          <InputField 
            label="Full Name"
            placeholder="Enter your full name"
            value={form.fullName}
            onChangeText={(text: string) => setForm({ ...form, fullName: text })}
            icon={<User size={scale(20)} color="rgba(255,255,255,0.5)" />}
          />
          <InputField 
            label="Nickname (Student Profile Setup)"
            placeholder="What should we call you?"
            value={form.nickname}
            onChangeText={(text: string) => setForm({ ...form, nickname: text })}
          />
        </GlassCard>

        {/* Education */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: normalize(10) }}>
              <SelectField 
                label="Class"
                options={CLASS_OPTIONS.map(opt => ({ ...opt, label: opt.value === form.class ? `${opt.label} (Selected)` : opt.label }))}
                value={form.class}
                onSelect={(val: string) => setForm({ ...form, class: val })}
                placeholder="Select Class"
              />
            </View>
            <View style={{ flex: 1 }}>
              <SelectField 
                label="Board"
                options={BOARD_OPTIONS.map(opt => ({ ...opt, label: opt.value === form.board ? `${opt.label} (Selected)` : opt.label }))}
                value={form.board}
                onSelect={(val: string) => setForm({ ...form, board: val })}
                placeholder="Select Board"
              />
            </View>
          </View>
          <ToggleGroup 
            label="Medium"
            options={['English', 'Hindi']}
            value={form.medium}
            onSelect={(val: string) => setForm({ ...form, medium: val as any })}
          />
        </GlassCard>

        {/* Location & Contact */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Location & Contact</Text>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: normalize(10) }}>
              <InputField 
                label="City"
                placeholder="Enter your city"
                value={form.city}
                onChangeText={(text: string) => setForm({ ...form, city: text })}
                icon={<MapPin size={scale(20)} color="rgba(255,255,255,0.5)" />}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SelectField 
                label="State"
                options={[
                  { label: 'Maharashtra', value: 'maharashtra' },
                  { label: 'Delhi', value: 'delhi' },
                  { label: 'Karnataka', value: 'karnataka' },
                ].map(opt => ({ ...opt, label: opt.value === form.state ? `${opt.label} (Selected)` : opt.label }))}
                value={form.state}
                onSelect={(val: string) => setForm({ ...form, state: val })}
                placeholder="Select State"
              />
            </View>
          </View>
          
          <Text style={styles.inputLabel}>Parent Mobile number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>+91</Text>
              <ChevronLeft size={scale(16)} color="rgba(255,255,255,0.5)" style={{ transform: [{ rotate: '-90deg' }] }} />
            </View>
            <View style={styles.phoneDivider} />
            <InputField 
              placeholder="Parent's phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={form.parentPhone}
              onChangeText={(text: string) => setForm({ ...form, parentPhone: text })}
              style={styles.phoneInput}
              containerStyle={{ marginBottom: 0, flex: 1}}
              noLabel
            />
          </View>
        </GlassCard>

        {/* Academic Preferences */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Academic Preferences</Text>
          </View>
          
          <Text style={styles.subLabel}>Preferred Subjects:</Text>
          <View style={styles.chipContainer}>
            {SUBJECTS.slice(0, 3).map(subject => (
              <Chip 
                key={subject}
                label={subject}
                selected={form.preferredSubjects.includes(subject)}
                onPress={() => toggleSubject(subject, 'preferred')}
              />
            ))}
          </View>

          <Text style={styles.subLabel}>Weak Subjects:</Text>
          <View style={styles.chipContainer}>
            {['Social Studies', 'Geography'].map(subject => (
              <Chip 
                key={subject}
                label={subject}
                selected={form.weakSubjects.includes(subject)}
                onPress={() => toggleSubject(subject, 'weak')}
              />
            ))}
          </View>
        </GlassCard>

        <Button 
          text="Continue" 
          onPress={handleContinue}
          loading={loading}
          glow
          style={styles.button}
        />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: normalize(20),
  },
  headerContainer: {
    paddingTop: hp(2),
    marginBottom: normalize(20),
    flexDirection: 'row',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleGroup: {
    marginBottom: normalize(10),
    borderRadius: normalize(12),
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: '#fff',
    fontSize: normalize(22),
    marginBottom: normalize(6),
    fontWeight: '700',
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(12),
    lineHeight: normalize(17),
  },
  sectionCard: {
    marginBottom: normalize(20),
  },
  sectionHeader: {
    marginBottom: normalize(20),
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    fontSize: normalize(18),
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: normalize(14),
    marginBottom: normalize(8),
    fontWeight: '500',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    height: normalize(56),
    paddingHorizontal: normalize(12),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: normalize(10),
  },
  countryCodeText: {
    color: '#fff',
    fontSize: normalize(16),
    marginRight: normalize(4),
  },
  phoneDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: normalize(10),
  },
  phoneInput: {
    flex: 1,
    fontSize: normalize(16),
    color: '#fff',

  },
  subLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(14),
    marginBottom: normalize(10),
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: normalize(20),
  },
  button: {
    marginTop: normalize(10),
    marginBottom: normalize(30),
  },
});




