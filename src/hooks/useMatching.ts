import { useState, useEffect, useCallback, useRef } from 'react';
import { matchingService } from '../services/matching.service';
import { TeacherNode, MatchingStatus } from '../models/matching.model';

export const useMatching = (doubtId: string) => {
  const [status, setStatus] = useState<'searching' | 'matched' | 'failed'>('searching');
  const [teachers, setTeachers] = useState<TeacherNode[]>([]);
  const [matchData, setMatchData] = useState<MatchingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const requestIdRef = useRef<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMatching = useCallback(async () => {
    try {
      setLoading(true);
      const { requestId } = await matchingService.startMatching(doubtId);
      requestIdRef.current = requestId;
      startPolling();
    } catch (err) {
      setError('Failed to start matching');
      setLoading(false);
    }
  }, [doubtId]);

  const startPolling = useCallback(() => {
    pollIntervalRef.current = setInterval(async () => {
      if (!requestIdRef.current) return;
      
      try {
        const data = await matchingService.getStatus(requestIdRef.current);
        setMatchData(data);
        setTeachers(data.teachers);
        
        if (data.status === 'matched') {
          setStatus('matched');
          stopPolling();
        } else if (data.status === 'failed') {
          setStatus('failed');
          stopPolling();
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  const cancelMatching = useCallback(async () => {
    if (!requestIdRef.current) return;
    
    try {
      stopPolling();
      await matchingService.cancelMatching(requestIdRef.current);
      return true;
    } catch (err) {
      console.error('Cancel error:', err);
      return false;
    }
  }, [stopPolling]);

  useEffect(() => {
    startMatching();
    return () => stopPolling();
  }, [startMatching, stopPolling]);

  return {
    status,
    teachers,
    matchData,
    loading,
    error,
    cancelMatching,
  };
};
