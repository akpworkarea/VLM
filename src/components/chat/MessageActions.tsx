import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChatAction } from '@/src/models/chat.model';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { MessageSquare, Lightbulb, Languages, FileQuestion } from 'lucide-react-native';

interface MessageActionsProps {
  onAction: (action: ChatAction) => void;
}

const ACTIONS: { id: ChatAction; label: string; icon: any }[] = [
  { id: 'simplify', label: 'Simplify', icon: MessageSquare },
  { id: 'example', label: 'Example', icon: Lightbulb },
  { id: 'translate', label: 'Explain in Hindi', icon: Languages },
  { id: 'practice', label: 'Practice Question', icon: FileQuestion },
];

export const MessageActions = ({ onAction }: MessageActionsProps) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {ACTIONS.map((action) => (
        <TouchableOpacity 
          key={action.id}
          style={styles.actionButton}
          onPress={() => onAction(action.id)}
        >
          <View style={styles.iconWrapper}>
            <action.icon size={scale(18)} color="white" />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: normalize(12),
    paddingRight: normalize(20),
  },
  actionButton: {
    width: normalize(80),
    height: normalize(80),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(8),
  },
  iconWrapper: {
    marginBottom: normalize(8),
  },
  label: {
    color: 'white',
    fontSize: normalize(9),
    fontWeight: '600',
    textAlign: 'center',
  },
});
