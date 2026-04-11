import { useState, useEffect } from 'react';
import { VerificationStatus } from '../models/verification.model';
import { MOCK_VERIFICATION_STATUS } from '../mock/verification.mock';

export const useVerification = () => {
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus(MOCK_VERIFICATION_STATUS);
      } catch (err) {
        setError('Failed to fetch verification status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return { status, loading, error };
};
