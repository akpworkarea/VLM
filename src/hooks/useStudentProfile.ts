import { useState } from 'react';
import { StudentProfile } from '../models/student.model';
import { studentService } from '../services/student.service';
import { useUserStore } from '../store/useUserStore';

export const useStudentProfile = () => {
  const { setStudentProfile } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = async (profile: StudentProfile) => {
    setLoading(true);
    setError(null);
    try {
      const result = await studentService.createProfile(profile);
      if (result.success) {
        setStudentProfile(result.data);
        return true;
      }
      setError('Failed to create profile');
      return false;
    } catch (err) {
      setError('An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createProfile, loading, error };
};
