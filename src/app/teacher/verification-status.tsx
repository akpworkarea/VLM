import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { HelpCircle, ChevronRight } from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { TimelineItem } from '@/src/components/ui/TimelineItem';
import { useVerification } from '@/src/hooks/useVerification';
import { COLORS } from '@/src/constants/colors';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function VerificationStatusScreen() {
  const router = useRouter();
  const { status, loading, error } = useVerification();

  if (loading && !status) {
    return (
      <ScreenWrapper>
        <PageHeader subtitle="VERIFICATION STATUS" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (error || !status) {
    return (
      <ScreenWrapper>
        <PageHeader subtitle="VERIFICATION STATUS" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Something went wrong'}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper noPadding contentContainerStyle={styles.scrollContent}>
      <PageHeader 
        subtitle="Verification Status" 
        showBack={true}
      />
      
      <View>
        <Text style={styles.headerDescription}>
          Keep track of your application progress.
        </Text>

        <GlassCard delay={300} style={styles.mainCard} glow={true}>
          <View style={styles.timelineContainer}>
            {status.steps.map((step, index) => (
              <TimelineItem
                key={step.id}
                title={step.title}
                description={step.description}
                status={step.status}
                iconName={step.icon}
                isLast={index === status.steps.length - 1}
                delay={400 + index * 100}
              />
            ))}
          </View>

          <View style={styles.divider} />
          
          <View style={styles.footerInfo}>
            <Text style={styles.footerText}>
              Verification ID: <Text style={styles.boldText}>{status.verificationId}</Text> | Applicant: <Text style={styles.boldText}>{status.applicantName}</Text>
            </Text>
          </View>
        </GlassCard>

        <TouchableOpacity 
          style={styles.supportButton}
          activeOpacity={0.7}
          onPress={() => console.log('Contact Support')}
        >
          <GlassCard noPadding style={styles.supportCard}>
            <View style={styles.supportContent}>
              <Text style={styles.supportText}>Have Questions? Contact Support</Text>
              <View style={styles.supportIconCircle}>
                <HelpCircle size={scale(16)} color="#fff" />
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>

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
    color: '#ef4444',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: normalize(20),
  },
  headerDescription: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    fontSize: normalize(13),
    marginBottom: normalize(25),
  },
  mainCard: {
    marginHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
  timelineContainer: {
    paddingVertical: normalize(10),
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: normalize(20),
    marginHorizontal: normalize(10),
  },
  footerInfo: {
    alignItems: 'center',
    paddingBottom: normalize(10),
  },
  footerText: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.3)',
    fontSize: normalize(10),
  },
  boldText: {
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
  },
  supportButton: {
    marginTop: normalize(20),
    marginHorizontal: normalize(20),
  },
  supportCard: {
    borderRadius: normalize(40),
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(14),
    gap: normalize(12),
  },
  supportText: {
    ...TYPOGRAPHY.body,
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '600',
  },
  supportIconCircle: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
