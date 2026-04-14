import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import { Message, Session } from '../models/chat.model';
import { MOCK_CHAT_MESSAGES, MOCK_SESSION } from '../mock/chat_session.mock';

export const chatSessionService = {
  getMessages: async (sessionId: string): Promise<Message[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_CHAT_MESSAGES), 500);
    });
  },

  sendMessage: async (sessionId: string, message: Partial<Message>): Promise<Message> => {
    return new Promise((resolve) => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: message.role || 'student',
        type: message.type || 'text',
        content: message.content || '',
        createdAt: new Date().toISOString(),
      };
      setTimeout(() => resolve(newMessage), 500);
    });
  },

  getSessionStatus: async (sessionId: string): Promise<Session> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SESSION), 500);
    });
  },

  uploadFile: async (fileUri: string): Promise<string> => {
    return new Promise((resolve) => {
      // Mock upload
      setTimeout(() => resolve(fileUri), 1000);
    });
  },
};
