import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MessageBubble } from './MessageBubble';
import { ImageMessage } from './ImageMessage';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface TeacherMessageProps {
  content: string;
  type?: 'text' | 'image';
  name?: string;
}

export const TeacherMessage = ({ content, type = 'text', name = 'Teacher' }: TeacherMessageProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{name}</Text>
      <MessageBubble role="teacher">
        {type === 'text' && <Text style={styles.text}>{content}</Text>}
        {type === 'image' && <ImageMessage uri={content} />}
      </MessageBubble>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: normalize(4),
    alignItems: 'flex-start',
  },
  name: {
    color: COLORS.cyan,
    fontSize: normalize(10),
    fontWeight: '700',
    marginLeft: normalize(12),
    marginBottom: normalize(4),
  },
  text: {
    color: 'white',
    fontSize: normalize(14),
    lineHeight: normalize(20),
  },
});
