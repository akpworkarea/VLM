import { useState, useEffect } from 'react';
import { Profile } from '../models/profile.model';
import { MOCK_PROFILE } from '../mock/profile.mock';
import apiClient from '../services/apiClient';
import { ENDPOINTS } from '../services/endpoints';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Simulating API call with mock data
      // In real app: const response = await apiClient.get(ENDPOINTS.GET_PROFILE);
      // setProfile(response.data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(MOCK_PROFILE);
      setError(null);
    } catch (err) {
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const submitVerification = async () => {
    setLoading(true);
    try {
      // In real app: await apiClient.post(ENDPOINTS.SUBMIT_VERIFICATION);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Submission failed' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    submitVerification,
  };
};
