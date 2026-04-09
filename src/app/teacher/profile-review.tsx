import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  School, 
  Calendar, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Languages, 
  FileText, 
  Play,
  ArrowRight
} from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { Header } from '@/src/components/layout/Header';

import { InfoCard } from '@/src/components/ui/InfoCard';
import { ListItem } from '@/src/components/ui/ListItem';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { Button } from '@/src/components/ui/Button';
import { useProfile } from '@/src/hooks/useProfile';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function ProfileReviewScreen() {
  const { profile, loading, submitVerification } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await submitVerification();
    setIsSubmitting(false);
    
    if (result.success) {
      Alert.alert('Success', 'Profile submitted for verification!');
    } else {
      Alert.alert('Error', result.error || 'Something went wrong');
    }
  };

  if (loading && !profile) {
    return (
      <ScreenWrapper>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (!profile) return null;

  const Footer = (
    <Button 
      text="SUBMIT FOR VERIFICATION" 
      onPress={handleSubmit}
      loading={isSubmitting}
      icon={<ArrowRight size={normalize(20)} color="white" />}
    />
  );

  return (
    <ScreenWrapper footer={Footer}>
      <Header />
      <View style={styles.subtitleRow}>
        <Text style={styles.pageSubtitle}>
          PROFILE REVIEW & FINAL SUBMIT
        </Text>
        </View>
      <View style={styles.content}>
        {/* Profile Details */}
        <InfoCard title="Profile Details" onEdit={() => {}} delay={100} style={styles.fullWidthCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: profile.user.avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.profileName}>{profile.user.name}</Text>
            <View style={styles.profileInfo}>
              <ListItem 
                label={profile.user.email} 
                icon={<Mail size={normalize(14)} color={COLORS.textSecondary} />} 
              />
              <ListItem 
                label={profile.user.phone} 
                icon={<Phone size={normalize(14)} color={COLORS.textSecondary} />} 
              />
              <ListItem 
                label={profile.user.address} 
                icon={<MapPin size={normalize(14)} color={COLORS.textSecondary} />} 
              />
            </View>
          </View>
        </InfoCard>

        <View style={styles.row}>
          {/* Qualifications */}
          <View style={styles.halfWidth}>
            <InfoCard title="Qualifications" onEdit={() => {}} delay={200}>
              <View style={styles.qualContent}>
                <Text style={styles.qualTitle}>{profile.qualifications.degree}</Text>
                <Text style={styles.qualSub}>Institution: {profile.qualifications.institution}</Text>
                <Text style={styles.qualSub}>Passing year: {profile.qualifications.year}</Text>
                {profile.qualifications.isBEd && <Text style={styles.qualSub}>B.Ed</Text>}
              </View>
            </InfoCard>
          </View>

          {/* Classes */}
          <View style={styles.halfWidth}>
            <InfoCard title="Classes" onEdit={() => {}} delay={300}>
              {profile.classes.map((item, index) => (
                <ListItem 
                  key={index} 
                  label={item} 
                  icon={<Users size={normalize(14)} color={COLORS.textSecondary} />} 
                />
              ))}
            </InfoCard>
          </View>
        </View>

        <View style={styles.row}>
          {/* Subjects */}
          <View style={styles.halfWidth}>
            <InfoCard title="Subjects" onEdit={() => {}} delay={400}>
              {profile.subjects.map((item, index) => (
                <ListItem 
                  key={index} 
                  label={item} 
                  icon={<BookOpen size={normalize(14)} color={COLORS.textSecondary} />} 
                />
              ))}
            </InfoCard>
          </View>

          {/* Languages */}
          <View style={styles.halfWidth}>
            <InfoCard title="Languages" onEdit={() => {}} delay={500}>
              {profile.languages.map((item, index) => (
                <ListItem 
                  key={index} 
                  label={item} 
                  icon={<Languages size={normalize(14)} color={COLORS.textSecondary} />} 
                />
              ))}
            </InfoCard>
          </View>
        </View>

        {/* Documents */}
        <InfoCard title="Uploaded Documents" onEdit={() => {}} delay={600} style={styles.fullWidthCard}>
          {profile.documents.map((doc) => (
            <ListItem 
              key={doc.id} 
              label={doc.name} 
              rightElement={<StatusBadge status={doc.status} />}
            />
          ))}
        </InfoCard>

        {/* Demo Video */}
        <InfoCard title="Demo Video Status" onEdit={() => {}} delay={700} style={styles.fullWidthCard}>
          <View style={styles.videoRow}>
            <View style={styles.videoIconContainer}>
              <Play size={normalize(16)} color="white" fill="white" />
            </View>
            <Text style={styles.videoText}>
              Demo Video - {profile.videoStatus.isUploaded ? 'Uploaded' : 'Not Uploaded'} & {'\n'}
              {profile.videoStatus.previewAvailable ? 'Preview Available' : 'No Preview'}
            </Text>
          </View>
        </InfoCard>

        <Text style={styles.disclaimer}>
          Disclaimer: may not use info, used by additional typographic in this elements. Sketches may be remixed and in color previewed.
        </Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: normalize(20),
  },
  subtitleRow: {
    alignItems: 'center',
    margin: normalize(15),
  },
  pageSubtitle: {
    ...TYPOGRAPHY.h3,
    color: 'white',
    fontSize: normalize(14),
    letterSpacing: 1,
    textAlign: 'center',
  },
  fullWidthCard: {
    marginHorizontal: normalize(20),
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    marginBottom: normalize(12),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    ...TYPOGRAPHY.h2,
    color: 'white',
    fontSize: normalize(20),
    marginBottom: normalize(12),
  },
  profileInfo: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(20),
    gap: normalize(12),
  },
  halfWidth: {
    flex: 1,
    marginHorizontal: 0, // Override GlassCard default
  },
  qualContent: {
    gap: normalize(4),
  },
  qualTitle: {
    ...TYPOGRAPHY.body,
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(14),
  },
  qualSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: normalize(12),
  },
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: normalize(12),
    borderRadius: normalize(12),
  },
  videoIconContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(8),
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    ...TYPOGRAPHY.caption,
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(18),
  },
  disclaimer: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginHorizontal: normalize(40),
    marginTop: normalize(20),
    fontSize: normalize(10),
    lineHeight: normalize(14),
  },
});
