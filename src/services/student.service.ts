import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import { StudentProfile } from '../models/student.model';
import { MOCK_PLANS } from '../mock/student.mock';

export const studentService = {
  createProfile: async (profile: StudentProfile) => {
    // Demo: Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, data: profile };
    // return apiClient.post(ENDPOINTS.CREATE_STUDENT_PROFILE, profile);
  },

  getPlans: async () => {
    // Demo: Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data: MOCK_PLANS };
    // return apiClient.get(ENDPOINTS.GET_PLANS);
  },

  startTrial: async (planId: string) => {
    // Demo: Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
    // return apiClient.post(ENDPOINTS.START_TRIAL, { planId });
  },
};
