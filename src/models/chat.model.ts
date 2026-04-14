export interface Message {
  id: string;
  role: 'user' | 'ai' | 'student' | 'teacher';
  type: 'text' | 'image';
  content: string;
  createdAt: string;
}

export type ChatAction = 'simplify' | 'example' | 'translate' | 'practice';

export interface ChatPayload {
  message: string;
  context?: string;
  action?: ChatAction;
}

export interface Session {
  id: string;
  subject: string;
  teacherName: string;
  teacherAvatar: string;
  remainingTime: number;
}
