import { useState, useCallback, useEffect } from 'react';
import { Message, ChatAction } from '../models/chat.model';
import { chatService } from '../services/chat.service';

export const useChat = (initialDoubt?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialDoubt) {
      // Add initial user message if provided
      const userMsg: Message = {
        id: 'initial_user',
        role: 'user',
        type: 'text',
        content: initialDoubt,
        createdAt: new Date().toISOString(),
      };
      setMessages([userMsg]);
      handleSendMessage(initialDoubt);
    }
  }, []);

  const handleSendMessage = async (content: string, action?: ChatAction) => {
    if (!content.trim() && !action) return;

    // If it's a new user message (not an action on existing)
    if (!action) {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        type: 'text',
        content,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMsg]);
    }

    setLoading(true);
    try {
      const aiResponse = await chatService.sendMessage({ 
        message: content, 
        action 
      });
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerAction = (action: ChatAction, context: string) => {
    handleSendMessage(context, action);
  };

  return {
    messages,
    sendMessage: handleSendMessage,
    triggerAction,
    loading,
  };
};
