import { Subject, Chapter } from '../models/doubt.model';

export const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'Physics' },
  { id: '3', name: 'Chemistry' },
  { id: '4', name: 'Biology' },
];

export const MOCK_CHAPTERS: Chapter[] = [
  { id: '1', name: 'Algebra', subjectId: '1' },
  { id: '2', name: 'Calculus', subjectId: '1' },
  { id: '3', name: 'Trigonometry', subjectId: '1' },
  { id: '4', name: 'Mechanics', subjectId: '2' },
  { id: '5', name: 'Thermodynamics', subjectId: '2' },
  { id: '6', name: 'Organic Chemistry', subjectId: '3' },
  { id: '7', name: 'Genetics', subjectId: '4' },
];
