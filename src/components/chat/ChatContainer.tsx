import React, { useRef } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Message, ChatAction } from '@/src/models/chat.model';
import { UserMessage } from './UserMessage';
import { TeacherMessage } from './TeacherMessage';
import { AIMessage } from './AIMessage';
import { TypingIndicator } from './TypingIndicator';
import { normalize } from '@/src/utils/responsive';

interface ChatContainerProps {
  messages: Message[];
  loading?: boolean;
  onAction?: (action: ChatAction, context: string) => void;
  isHumanChat?: boolean;
}

export const ChatContainer = ({ messages, loading, onAction, isHumanChat }: ChatContainerProps) => {
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    if (item.role === 'user' || item.role === 'student') {
      return (
        <UserMessage 
          content={item.content} 
          type={item.type} 
        />
      );
    }
    
    if (item.role === 'teacher') {
      return (
        <TeacherMessage 
          content={item.content} 
          type={item.type} 
        />
      );
    }

    if (item.role === 'ai') {
      const isLastAI = index === messages.length - 1;
      return (
        <AIMessage 
          content={item.content} 
          onAction={(action) => onAction?.(action, item.content)}
          showActions={isLastAI && !loading}
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={loading ? <TypingIndicator /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
  },
});
