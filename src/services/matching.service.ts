import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import { MatchingStatus } from '../models/matching.model';
import { getMockStatus } from '../mock/matching.mock';

let currentStep = 0;

export const matchingService = {
  startMatching: async (doubtId: string): Promise<{ requestId: string }> => {
    currentStep = 0;
    return new Promise((resolve) => {
      setTimeout(() => resolve({ requestId: 'req_123' }), 500);
    });
  },

  getStatus: async (requestId: string): Promise<MatchingStatus> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const status = getMockStatus(currentStep);
        if (currentStep < 5) currentStep++;
        resolve(status);
      }, 500);
    });
  },

  cancelMatching: async (requestId: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500);
    });
  },
};
