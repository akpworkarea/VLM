export interface TeacherNode {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface MatchingStatus {
  requestId: string;
  status: 'searching' | 'matched' | 'failed';
  teachers: TeacherNode[];
  sentToCount: number;
  subject: string;
  class: string;
  sessionType: string;
}
