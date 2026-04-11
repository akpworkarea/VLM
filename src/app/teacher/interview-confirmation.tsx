import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { 
  Calendar, 
  Clock, 
  Video, 
  Hash, 
  ShieldCheck,
  Info,
  ArrowRight
} from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { IconCircle } from '@/src/components/ui/IconCircle';
import { InfoCard } from '@/src/components/ui/InfoCard';
import { ListItem } from '@/src/components/ui/ListItem';
import { Button } from '@/src/components/ui/Button';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { useInterview } from '@/src/hooks/useInterview';
import { COLORS } from '@/src/constants/colors';
import { normalize, wp, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function InterviewConfirmationScreen() {
  const { interview, loading, joinInterview } = useInterview();

  if (loading && !interview) {
    return (
      <ScreenWrapper>
        <PageHeader subtitle="INTERVIEW CONFIRMATION" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (!interview) return null;

  const Footer = (
    <View style={styles.footerContainer}>
      <Button 
        text="JOIN INTERVIEW" 
        onPress={joinInterview}
        icon={<Video size={normalize(20)} color="white" />}
        disabled={interview.status !== 'scheduled'}
      />
      <Text style={styles.footerNote}>
        Button active 15 mins before start time.{"\n"}
        Confirmation email sent. Verification ongoing.
      </Text>
    </View>
  );

  return (
    <ScreenWrapper footer={Footer}>
      <PageHeader subtitle="INTERVIEW CONFIRMATION" showBack={false} />
      
      <View style={styles.content}>
        {/* Status Icon */}
        <IconCircle 
          label="SCHEDULED" 
          icon={<ShieldCheck size={scale(40)} color={COLORS.success} />}
          color={COLORS.success}
        />

        {/* Meeting Details Card */}
        <InfoCard title="Meeting Details" delay={100} style={styles.card}>
          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <Calendar size={scale(20)} color="#EAB308" />
              <Text style={styles.detailLabel}>Date: <Text style={styles.detailValue}>{interview.date}</Text></Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={scale(20)} color="#EAB308" />
              <Text style={styles.detailLabel}>Time: <Text style={styles.detailValue}>{interview.time}</Text></Text>
            </View>
            <View style={styles.detailItem}>
              <Info size={scale(20)} color="#EAB308" />
              <Text style={styles.detailLabel}>Status: <Text style={styles.detailValue}>Awaiting Meeting</Text></Text>
            </View>
            <View style={styles.detailItem}>
              <Hash size={scale(20)} color="#EAB308" />
              <Text style={styles.detailLabel}>Meeting ID: <Text style={styles.detailValue}>{interview.meetingId}</Text></Text>
            </View>
          </View>
        </InfoCard>

        {/* Status History Card */}
        <InfoCard title="Status History" delay={200} style={styles.card}>
          <Text style={styles.historyText}>
            (e.g., Showing scheduling confirmed and verification in progress)
          </Text>
        </InfoCard>

        {/* Interview Instructions Card */}
        <InfoCard title="Interview Instructions" delay={300} style={styles.card}>
          <View style={styles.instructionsList}>
            {interview.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionBullet}>•</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </InfoCard>
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
  card: {
    marginHorizontal: normalize(20),
  },
  detailsList: {
    gap: normalize(12),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  detailLabel: {
    ...TYPOGRAPHY.body,
    color: '#EAB308',
    fontWeight: '700',
    fontSize: normalize(14),
  },
  detailValue: {
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  historyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontSize: normalize(14),
    lineHeight: normalize(20),
  },
  instructionsList: {
    gap: normalize(8),
  },
  instructionItem: {
    flexDirection: 'row',
    gap: normalize(10),
    paddingHorizontal: normalize(10),
  },
  instructionBullet: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontSize: normalize(14),
  },
  instructionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontSize: normalize(14),
    lineHeight: normalize(22),
    flex: 1,
  },
  footerContainer: {
    alignItems: 'center',
    gap: normalize(12),
  },
  footerNote: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: normalize(11),
    lineHeight: normalize(16),
  },
});
