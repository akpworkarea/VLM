import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { DashboardHeader } from '@/src/components/dashboard/DashboardHeader';
import { FeatureCard } from '@/src/components/dashboard/FeatureCard';
import { StatCard } from '@/src/components/dashboard/StatCard';
import { ActionCard } from '@/src/components/dashboard/ActionCard';
import { HorizontalList } from '@/src/components/dashboard/HorizontalList';
import { useDashboard } from '@/src/hooks/useDashboard';
import { normalize, wp } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { 
  MessageSquare, 
  Bot, 
  Users, 
  BookOpen, 
  Trophy, 
  Star 
} from 'lucide-react-native';

export default function StudentHomeScreen() {
  const router = useRouter();
  const { data, loading, refresh } = useDashboard();

  if (loading && !data) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.cyan} />
        </View>
      </ScreenWrapper>
    );
  }

  if (!data) return null;

  return (
    <ScreenWrapper noPadding scrollEnabled={false}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={COLORS.cyan} />
        }
      >
        <DashboardHeader 
          name={data.userName} 
          onNotificationPress={() => console.log('Notifications')} 
        />

        {/* Feature Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <FeatureCard 
                title="Ask Doubt" 
                icon={MessageSquare} 
                glowType="blue" 
                onPress={() => router.push('/doubt')}
                delay={100}
              />
            </View>
            <View style={styles.col}>
              <FeatureCard 
                title="AI Tutor" 
                icon={Bot} 
                glowType="purple" 
                onPress={() => console.log('AI Tutor')}
                delay={200}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <FeatureCard 
                title="Live Teacher" 
                icon={Users} 
                glowType="yellow" 
                badge="NEW"
                onPress={() => router.push('/live')}
                delay={300}
              />
            </View>
            <View style={styles.col}>
              <FeatureCard 
                title="Daily MCQ Task" 
                subtitle={`Completed: ${data.mcqCompleted}/${data.mcqTotal}`}
                icon={BookOpen} 
                glowType="blue" 
                onPress={() => router.push('/mcq')}
                delay={400}
              />
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <StatCard 
                title="Leaderboard Rank" 
                value={`#${data.rank}`}
                subtitle={`Your Rank: #${data.rank}\n↑ +${data.rankChange} Positions`}
                icon={Trophy} 
                glowType="red"
                delay={500}
              />
            </View>
            <View style={styles.col}>
              <StatCard 
                title="Reward Points" 
                value={data.rewardPoints}
                subtitle={`Total: ${data.rewardPoints} pts`}
                icon={Star} 
                glowType="yellow"
                delay={600}
              />
            </View>
          </View>
        </View>

        {/* Action Section */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <ActionCard 
                type="spin"
                title="Spin & Win Timer"
                subtitle="Next Spin in: 00:45:12"
                buttonText="SPIN NOW"
                onPress={() => console.log('Spin')}
                glowType="purple"
                delay={700}
              />
            </View>
            <View style={styles.col}>
              <ActionCard 
                type="live"
                title="Upcoming Live Class"
                buttonText="JOIN LIVE 00:45:12"
                onPress={() => router.push('/live')}
                glowType="blue"
                delay={800}
                liveData={{
                  topic: data.liveClass.topic,
                  teacher: data.liveClass.teacher,
                  avatar: data.liveClass.teacherAvatar,
                  time: data.liveClass.time,
                }}
              />
            </View>
          </View>
        </View>

        {/* Content Sections */}
        <HorizontalList 
          title="Short Live Sessions" 
          data={data.shortSessions} 
          type="session" 
          onItemPress={(item) => console.log('Session', item)} 
        />

        <HorizontalList 
          title="Short Video Feed" 
          data={data.shortVideos} 
          type="video" 
          onItemPress={(item) => console.log('Video', item)} 
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: normalize(100), // Space for tab bar
  },
  gridContainer: {
    paddingHorizontal: normalize(20),
    gap: normalize(16),
    marginTop: normalize(16),
  },
  row: {
    flexDirection: 'row',
    gap: normalize(16),
  },
  col: {
    flex: 1,
  },
  bottomSpacer: {
    height: normalize(20),
  },
});
