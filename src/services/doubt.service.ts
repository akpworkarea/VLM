import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import { Subject, Chapter, DoubtPayload } from '../models/doubt.model';
import { MOCK_SUBJECTS, MOCK_CHAPTERS } from '../mock/doubt.mock';

export const doubtService = {
  getSubjects: async (): Promise<Subject[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SUBJECTS), 500);
    });
    // Real implementation:
    // const response = await apiClient.get(ENDPOINTS.GET_SUBJECTS);
    // return response.data;
  },

  getChapters: async (subjectId: string): Promise<Chapter[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const chapters = MOCK_CHAPTERS.filter(c => c.subjectId === subjectId);
        resolve(chapters);
      }, 500);
    });
    // Real implementation:
    // const response = await apiClient.get(`${ENDPOINTS.GET_CHAPTERS}?subjectId=${subjectId}`);
    // return response.data;
  },

  submitDoubt: async (payload: DoubtPayload): Promise<{ success: boolean; id?: string }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, id: Math.random().toString(36).substr(2, 9) }), 1000);
    });
    // Real implementation:
    // const response = await apiClient.post(ENDPOINTS.SUBMIT_DOUBT, payload);
    // return response.data;
  },
};
