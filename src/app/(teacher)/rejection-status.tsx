import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ShieldAlert, MessageCircle, Edit3 } from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { IconCircle } from '@/src/components/ui/IconCircle';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { CountdownTimer } from '@/src/components/ui/CountdownTimer';
import { useReapplication } from '@/src/hooks/useReapplication';
import { useCountdown } from '@/src/hooks/useCountdown';
import { COLORS } from '@/src/constants/colors';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function RejectionStatusScreen() {
  const { rejection, loading, error, handleReapply } = useReapplication();
  const timeLeft = useCountdown(rejection?.reapplyAt || new Date().toISOString());

  if (loading && !rejection) {
    return (
      <ScreenWrapper>
        <PageHeader subtitle="TEACHER PORTAL" title="VLM Academy" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      </ScreenWrapper>
    );
  }

  if (error || !rejection) {
    return (
      <ScreenWrapper>
        <PageHeader subtitle="TEACHER PORTAL" title="VLM Academy" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Something went wrong'}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper noPadding contentContainerStyle={styles.scrollContent}>
      <PageHeader 
        title="VLM Academy" 
        subtitle="TEACHER PORTAL" 
        showBack={true} 
      />
      
      <View>
        {/* Status Icon */}
        <IconCircle 
          label="REJECTED" 
          color={COLORS.red}
          icon={<ShieldAlert size={scale(40)} color={COLORS.red} />}
        />

        {/* Rejection Card */}
        <GlassCard delay={200} style={styles.mainCard}>
          <Text style={styles.statusTitle}>APPLICATION STATUS: REJECTED</Text>
          <Text style={styles.statusSubtitle}>
            Based on our review, your application was not approved for teacher onboarding.
          </Text>

          <View style={styles.reasonContainer}>
            <View style={styles.reasonContent}>
              <View style={styles.reasonHeader}>
                <ShieldAlert size={normalize(16)} color={COLORS.red} />
                <Text style={styles.reasonLabel}>Reason for Rejection</Text>
              </View>
              <Text style={styles.reasonText}>{rejection.reason}</Text>
            </View>
          </View>

          <Text style={styles.guidanceText}>
            Please take this time to review your profile and address the feedback. 
            You may reapply after addressing these issues.
          </Text>
        </GlassCard>

        {/* Countdown Section */}
        <CountdownTimer timeLeft={timeLeft} delay={400} />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            text="EDIT PROFILE & ADDRESS FEEDBACK" 
            variant="danger"
            onPress={handleReapply}
            icon={<Edit3 size={normalize(20)} color="white" />}
            style={styles.button}
          />
          
          <Button 
            text="CONTACT TEACHER SUPPORT" 
            variant="outline"
            onPress={() => console.log('Contact Support')}
            icon={<MessageCircle size={normalize(20)} color="white" />}
            style={styles.button}
          />
        </View>

        <Text style={styles.footerNote}>
          VLM Academy Teacher Portal - Onboarding Status System
        </Text>
        
        <View style={{ height: normalize(40) }} />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.red,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: normalize(20),
  },
  mainCard: {
    marginHorizontal: normalize(20),
    alignItems: 'center',
    paddingVertical: normalize(25),
  },
  statusTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    fontSize: normalize(18),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: normalize(10),
  },
  statusSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: normalize(13),
    lineHeight: normalize(20),
    marginBottom: normalize(20),
    paddingHorizontal: normalize(10),
  },
  reasonContainer: {
    width: '100%',
    marginBottom: normalize(20),
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    borderStyle: 'dashed',
  },
  reasonContent: {
    padding: normalize(16),
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
    marginBottom: normalize(10),
  },
  reasonLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.red,
    fontWeight: '800',
    fontSize: normalize(12),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reasonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: normalize(13),
    lineHeight: normalize(18),
  },
  guidanceText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: normalize(12),
    lineHeight: normalize(18),
    paddingHorizontal: normalize(15),
  },
  buttonContainer: {
    paddingHorizontal: normalize(20),
    gap: normalize(12),
    marginTop: normalize(10),
  },
  button: {
    width: '100%',
  },
  footerNote: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    marginTop: normalize(30),
    fontSize: normalize(10),
  },
});
