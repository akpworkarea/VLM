export interface Subject {
  id: string;
  name: string;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
}

export type SessionType = 'ai' | 'chat' | 'call';

export interface DoubtPayload {
  subjectId: string;
  chapterId: string;
  question: string;
  images: string[];
  sessionType: SessionType;
}
