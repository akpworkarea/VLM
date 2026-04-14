import { TeacherNode, MatchingStatus } from '../models/matching.model';

export const MOCK_TEACHERS: TeacherNode[] = [
  { id: 't1', name: 'Dr. Smith', avatar: 'https://i.pravatar.cc/150?u=t1', isOnline: true },
  { id: 't2', name: 'Prof. Aryan', avatar: 'https://i.pravatar.cc/150?u=t2', isOnline: true },
  { id: 't3', name: 'Ms. Priya', avatar: 'https://i.pravatar.cc/150?u=t3', isOnline: true },
  { id: 't4', name: 'Mr. Rahul', avatar: 'https://i.pravatar.cc/150?u=t4', isOnline: true },
  { id: 't5', name: 'Dr. Anjali', avatar: 'https://i.pravatar.cc/150?u=t5', isOnline: true },
  { id: 't6', name: 'Prof. Khanna', avatar: 'https://i.pravatar.cc/150?u=t6', isOnline: true },
];

export const getMockStatus = (step: number): MatchingStatus => {
  const teachersCount = Math.min(step + 2, MOCK_TEACHERS.length);
  const teachers = MOCK_TEACHERS.slice(0, teachersCount);
  
  return {
    requestId: 'req_123',
    status: step >= 5 ? 'matched' : 'searching',
    teachers,
    sentToCount: step * 2 + 4,
    subject: 'Mathematics (Calculus)',
    class: 'Class 10th',
    sessionType: 'Live Video Call',
  };
};
