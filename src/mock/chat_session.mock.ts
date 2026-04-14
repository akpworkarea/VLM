import { Message, Session } from '../models/chat.model';

export const MOCK_SESSION: Session = {
  id: 'sess_123',
  subject: 'Math - Calculus',
  teacherName: 'Aisha Sharma',
  teacherAvatar: 'https://i.pravatar.cc/150?u=teacher_aisha',
  remainingTime: 445, // 7:25 in seconds
};

export const MOCK_CHAT_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'student',
    type: 'text',
    content: "I'm stuck on this second derivative step. Can you help?",
    createdAt: new Date(Date.now() - 100000).toISOString(),
  },
  {
    id: '2',
    role: 'student',
    type: 'image',
    content: 'https://picsum.photos/seed/math1/400/300',
    createdAt: new Date(Date.now() - 90000).toISOString(),
  },
  {
    id: '4',
    role: 'teacher',
    type: 'text',
    content: "Certainly, Aisha! Let's break it down.",
    createdAt: new Date(Date.now() - 70000).toISOString(),
  },
  {
    id: '5',
    role: 'teacher',
    type: 'text',
    content: "Start with dy/dx = f'(x), then d²y/dx² = [...]. Look at this term.",
    createdAt: new Date(Date.now() - 60000).toISOString(),
  },
];
