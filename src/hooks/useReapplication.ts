import { useState, useEffect } from 'react';
import { Rejection } from '../models/rejection.model';
import { MOCK_REJECTION } from '../mock/rejection.mock';

export const useReapplication = () => {
  const [rejection, setRejection] = useState<Rejection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRejectionStatus = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRejection(MOCK_REJECTION);
      } catch (err) {
        setError('Failed to fetch rejection status');
      } finally {
        setLoading(false);
      }
    };

    fetchRejectionStatus();
  }, []);

  const handleReapply = async () => {
    console.log('Reapplying...');
    // Implement reapply logic here
  };

  return { rejection, loading, error, handleReapply };
};
