import { useState, useEffect, useCallback, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Message, Session } from '../models/chat.model';
import { chatSessionService } from '../services/chatSession.service';

export const useChatSession = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const data = await chatSessionService.getMessages(sessionId);
      setMessages(data);
    } catch (error) {
      console.error('Fetch messages error:', error);
    }
  }, [sessionId]);

  const fetchSession = useCallback(async () => {
    try {
      const data = await chatSessionService.getSessionStatus(sessionId);
      setSession(data);
    } catch (error) {
      console.error('Fetch session error:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchMessages(), fetchSession()]);
      setLoading(false);
    };
    init();

    pollInterval.current = setInterval(fetchMessages, 3000);
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [fetchMessages, fetchSession]);

  const sendText = async (text: string) => {
    if (!text.trim()) return;
    const msg = await chatSessionService.sendMessage(sessionId, {
      role: 'student',
      type: 'text',
      content: text,
    });
    setMessages((prev) => [...prev, msg]);
  };

  const sendImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = await chatSessionService.uploadFile(result.assets[0].uri);
      const msg = await chatSessionService.sendMessage(sessionId, {
        role: 'student',
        type: 'image',
        content: uri,
      });
      setMessages((prev) => [...prev, msg]);
    }
  };

  return {
    messages,
    session,
    loading,
    sendText,
    sendImage,
  };
};
