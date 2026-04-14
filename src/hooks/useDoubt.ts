import { useState, useEffect, useCallback } from 'react';
import { Subject, Chapter, DoubtPayload, SessionType } from '../models/doubt.model';
import { doubtService } from '../services/doubt.service';

export const useDoubt = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<DoubtPayload>({
    subjectId: '',
    chapterId: '',
    question: '',
    images: [],
    sessionType: 'ai',
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (form.subjectId) {
      fetchChapters(form.subjectId);
    } else {
      setChapters([]);
    }
  }, [form.subjectId]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const data = await doubtService.getSubjects();
      setSubjects(data);
    } catch (err) {
      setError('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (subjectId: string) => {
    try {
      setLoading(true);
      const data = await doubtService.getChapters(subjectId);
      setChapters(data);
    } catch (err) {
      setError('Failed to fetch chapters');
    } finally {
      setLoading(false);
    }
  };

  const setField = useCallback((field: keyof DoubtPayload, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const submitDoubt = async () => {
    if (!isValid) return;
    try {
      setLoading(true);
      const result = await doubtService.submitDoubt(form);
      return result;
    } catch (err) {
      setError('Failed to submit doubt');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isValid = 
    form.subjectId !== '' && 
    form.chapterId !== '' && 
    form.question.trim().length > 0 && 
    form.sessionType !== undefined;

  return {
    subjects,
    chapters,
    form,
    setField,
    submitDoubt,
    isValid,
    loading,
    error,
  };
};
