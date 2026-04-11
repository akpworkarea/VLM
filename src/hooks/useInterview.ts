import { useState, useEffect } from 'react';
import { Interview } from '../models/interview.model';
import { MOCK_INTERVIEW } from '../mock/interview.mock';

export const useInterview = () => {
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInterview(MOCK_INTERVIEW);
      } catch (err) {
        setError('Failed to fetch interview details');
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, []);

  const joinInterview = async () => {
    try {
      // Simulate join action
      console.log('Joining interview:', interview?.meetingId);
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    interview,
    loading,
    error,
    joinInterview
  };
};
