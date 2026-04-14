import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';

export interface MessageBubbleProps {
  content?: string;
  role: 'user' | 'ai' | 'student' | 'teacher';
  children?: React.ReactNode;
}

export const MessageBubble = ({ content, role, children }: MessageBubbleProps) => {
  const isStudent = role === 'user' || role === 'student';
  const isTeacher = role === 'ai' || role === 'teacher';

  return (
    <Animated.View 
      entering={FadeInUp.duration(400)}
      style={[
        styles.container,
        isStudent ? styles.studentContainer : styles.teacherContainer
      ]}
    >
      <View style={[
        styles.bubble,
        isStudent ? styles.studentBubble : styles.teacherBubble
      ]}>
        {content && (
          <Text style={[
            styles.text,
            isStudent ? styles.studentText : styles.teacherText
          ]}>
            {content}
          </Text>
        )}
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(8),
    flexDirection: 'row',
    width: '100%',
  },
  studentContainer: {
    justifyContent: 'flex-end',
  },
  teacherContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    padding: normalize(16),
    borderRadius: normalize(20),
    borderWidth: 1.5,
  },
  studentBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: COLORS.yellow,
    borderBottomRightRadius: normalize(4),
    shadowColor: COLORS.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  teacherBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: COLORS.cyan,
    borderBottomLeftRadius: normalize(4),
    shadowColor: COLORS.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    ...TYPOGRAPHY.body,
    fontSize: normalize(14),
    lineHeight: normalize(20),
  },
  studentText: {
    color: 'white',
  },
  teacherText: {
    color: 'white',
  },
});
