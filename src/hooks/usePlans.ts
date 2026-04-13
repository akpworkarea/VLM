import { useState, useEffect } from 'react';
import { Plan } from '../models/plan.model';
import { studentService } from '../services/student.service';

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const result = await studentService.getPlans();
      if (result.success) {
        setPlans(result.data);
      } else {
        setError('Failed to fetch plans');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const startTrial = async (planId: string) => {
    setLoading(true);
    try {
      const result = await studentService.startTrial(planId);
      return result.success;
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { plans, loading, error, startTrial };
};
