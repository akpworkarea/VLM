import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { ChatContainer } from '@/src/components/chat/ChatContainer';
import { ChatInput } from '@/src/components/chat/ChatInput';
import { SessionHeader } from '@/src/components/session/SessionHeader';
import { TimerBadge } from '@/src/components/session/TimerBadge';
import { useChatSession } from '@/src/hooks/useChatSession';
import { normalize } from '@/src/utils/responsive';

export default function HumanChatScreen() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const { 
    messages, 
    session, 
    loading, 
    sendText, 
    sendImage, 
  } = useChatSession(sessionId || 'temp_session');

  return (
    <ScreenWrapper noPadding scrollEnabled={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.topSection}>
          {session && <TimerBadge remainingTime={session.remainingTime} />}
          {session && (
            <SessionHeader 
              onBack={() => router.back()}
              subject={session.subject}
              teacherName={session.teacherName}
              teacherAvatar={session.teacherAvatar}
            />
          )}
        </View>

        <ChatContainer 
          messages={messages} 
          loading={loading} 
          isHumanChat 
        />

        <ChatInput 
          onSend={sendText} 
          onImage={sendImage}
          disabled={loading}
          placeholder="Type your explanation..."
        />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingBottom: normalize(10),
  },
});
