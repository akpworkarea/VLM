import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import { Message, ChatPayload } from '../models/chat.model';
import { getMockAIResponse } from '../mock/chat.mock';

export const chatService = {
  sendMessage: async (payload: ChatPayload): Promise<Message> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          role: 'ai',
          type: 'text',
          content: getMockAIResponse(payload.message, payload.action),
          createdAt: new Date().toISOString(),
        });
      }, 1500);
    });
  },

  getHistory: async (): Promise<Message[]> => {
    return [];
  }
};
