import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { RoleCard } from '@/src/components/ui/RoleCard';
import { Button } from '@/src/components/ui/Button';
import { useUserStore, UserRole } from '@/src/store/useUserStore';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';

const ROLES: { id: UserRole; title: string; description: string }[] = [
  { 
    id: 'student', 
    title: 'Student', 
    description: 'Explore courses, take quizzes, track my progress.' 
  },
  { 
    id: 'parent', 
    title: 'Parent', 
    description: 'View reports, connect with teachers, monitor growth.' 
  },
  { 
    id: 'teacher', 
    title: 'Teacher', 
    description: 'Manage classes, create content, grade assignments.' 
  }
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { role, setRole } = useUserStore();

  const handleContinue = () => {
    if (role) {
      router.push('/login');
    }
  };

  const Footer = (
    <Animated.View entering={FadeInDown.delay(600).duration(500)}>
      <Button 
        text="CONTINUE" 
        onPress={handleContinue} 
        disabled={!role}
      />
    </Animated.View>
  );

  return (
    <ScreenWrapper footer={Footer}>
      <PageHeader 
        title="VLM Academy" 
        subtitle="WELCOME, PLEASE SELECT YOUR ROLE" 
        showBack={false} 
      />

      <View style={styles.container}>
        {ROLES.map((item, index) => (
          <RoleCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            selected={role === item.id}
            onSelect={setRole}
            delay={200 + index * 100}
          />
        ))}
      </View>

      <Animated.Text 
        entering={FadeInDown.delay(500).duration(500)}
        style={styles.footerNote}
      >
        You can change your role later in settings
      </Animated.Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
    marginTop: normalize(20),
  },
  footerNote: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: normalize(20),
    marginBottom: normalize(40),
  },
});
