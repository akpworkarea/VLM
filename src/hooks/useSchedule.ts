import { useState, useEffect, useCallback } from 'react';
import { Schedule, TimeSlot } from '../models/schedule.model';
import { MOCK_SCHEDULES } from '../mock/schedule.mock';
import apiClient from '../services/apiClient';
import { ENDPOINTS } from '../services/endpoints';

const USE_MOCK = true; // Toggle for API vs Mock

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Demo: Simulating a backend API call
      console.log('Fetching available slots from backend...');
      
      if (USE_MOCK) {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 1200));
        setSchedules(MOCK_SCHEDULES);
      } else {
        const response = await apiClient.get(ENDPOINTS.GET_SLOTS);
        setSchedules(response.data);
      }
    } catch (err) {
      setError('Failed to fetch schedule slots');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const getSlotsForDate = useCallback((date: string): TimeSlot[] => {
    const schedule = schedules.find(s => s.date === date);
    return schedule ? schedule.slots : [];
  }, [schedules]);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    getSlotsForDate,
  };
}
