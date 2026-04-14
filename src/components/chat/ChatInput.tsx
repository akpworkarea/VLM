import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Send } from 'lucide-react-native';
import { AttachmentBar } from './AttachmentBar';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';

interface ChatInputProps {
  onSend: (message: string) => void;
  onImage?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSend, 
  onImage, 
  disabled,
  placeholder = "Ask another question..."
}: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {onImage && (
          <AttachmentBar 
            onImage={onImage} 
          />
        )}
        
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={message}
          onChangeText={setMessage}
          multiline
          editable={!disabled}
        />

        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim() || disabled}
        >
          <Send size={scale(18)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
    paddingTop: normalize(10),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalize(30),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: normalize(14),
    maxHeight: normalize(100),
    paddingHorizontal: normalize(12),
  },
  sendButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.cyan,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalize(4),
    shadowColor: COLORS.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0,
  },
});
