import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, BookOpen, GraduationCap, Video } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { MatchingNetwork } from '@/src/components/matching/MatchingNetwork';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { useMatching } from '@/src/hooks/useMatching';
import { normalize, scale, wp } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function TeacherSearchingScreen() {
  const router = useRouter();
  const { doubtId } = useLocalSearchParams<{ doubtId: string }>();
  const { status, teachers, matchData, cancelMatching } = useMatching(doubtId || 'temp');

  const handleCancel = async () => {
    const success = await cancelMatching();
    if (success) {
      router.back();
    }
  };

  useEffect(() => {
    if (status === 'matched') {
      setTimeout(() => {
        router.push({
          pathname: '/human-chat',
          params: { sessionId: matchData?.requestId }
        });
      }, 1500);
    }
  }, [status, matchData]);

  return (
    <ScreenWrapper noPadding>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={scale(24)} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teacher Searching</Text>
        <View style={{ width: scale(40) }} />
      </View>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text style={styles.title}>Finding the best teacher for your doubt...</Text>
        </Animated.View>

        <View style={styles.networkContainer}>
          <MatchingNetwork teachers={teachers} />
          
          <Animated.View 
            entering={FadeIn.delay(400)}
            style={styles.statusBadge}
          >
            <Text style={styles.statusText}>
              Request sent to {matchData?.sentToCount || 0} teachers
            </Text>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(600).duration(600)}>
          <GlassCard style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <BookOpen size={scale(20)} color={COLORS.textSecondary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Subject</Text>
                <Text style={styles.infoValue}>{matchData?.subject || 'Loading...'}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <GraduationCap size={scale(20)} color={COLORS.textSecondary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Class</Text>
                <Text style={styles.infoValue}>{matchData?.class || 'Loading...'}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Video size={scale(20)} color={COLORS.textSecondary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Session Type</Text>
                <Text style={styles.infoValue}>{matchData?.sessionType || 'Loading...'}</Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        <View style={styles.footer}>
          <Button 
            text="Cancel Request" 
            variant="outline" 
            onPress={handleCancel}
            style={styles.cancelButton}
          />
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: '#fff',
    fontSize: normalize(24),
    fontWeight: '800',
    lineHeight: normalize(32),
    marginBottom: normalize(40),
  },
  networkContainer: {
    height: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(40),
  },
  statusBadge: {
    position: 'absolute',
    top: -normalize(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: normalize(12),
    fontWeight: '600',
  },
  infoCard: {
    padding: normalize(20),
    gap: normalize(16),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(16),
  },
  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: normalize(10),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '700',
    marginTop: 2,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: normalize(30),
  },
  cancelButton: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
