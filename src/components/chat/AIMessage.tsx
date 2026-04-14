import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MessageBubble } from './MessageBubble';
import { MessageActions } from './MessageActions';
import { ChatAction } from '@/src/models/chat.model';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { Bot } from 'lucide-react-native';

interface AIMessageProps {
  content: string;
  onAction: (action: ChatAction) => void;
  showActions?: boolean;
}

export const AIMessage = ({ content, onAction, showActions = true }: AIMessageProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.botIcon}>
          <Bot size={scale(12)} color={COLORS.cyan} />
        </View>
        <Text style={styles.label}>VLM AI Tutor</Text>
      </View>
      <MessageBubble content={content} role="ai" />
      {showActions && (
        <View style={styles.actionsWrapper}>
          <MessageActions onAction={onAction} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: normalize(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    marginLeft: normalize(12),
    marginBottom: normalize(4),
  },
  botIcon: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: normalize(10),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  actionsWrapper: {
    marginTop: normalize(8),
    marginLeft: normalize(12),
  },
});
