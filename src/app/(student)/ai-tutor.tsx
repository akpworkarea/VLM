import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { ChatContainer } from '@/src/components/chat/ChatContainer';
import { ChatInput } from '@/src/components/chat/ChatInput';
import { ProgressBadge } from '@/src/components/ui/ProgressBadge';
import { useChat } from '@/src/hooks/useChat';
import { useUserStore } from '@/src/store/useUserStore';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function AITutorScreen() {
  const router = useRouter();
  const { initialQuestion } = useLocalSearchParams<{ initialQuestion: string }>();
  const { messages, sendMessage, triggerAction, loading } = useChat(initialQuestion);
  const { aiCredits } = useUserStore();

  return (
    <ScreenWrapper noPadding scrollEnabled={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={scale(24)} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AI Tutor - Active Learning</Text>
          </View>
          <ProgressBadge used={aiCredits.used} total={aiCredits.total} />
        </View>

        <ChatContainer 
          messages={messages} 
          loading={loading} 
          onAction={triggerAction}
        />

        <ChatInput onSend={sendMessage} disabled={loading} />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
    height: normalize(60),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
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
    fontSize: normalize(16),
    fontWeight: '700',
  },
});
