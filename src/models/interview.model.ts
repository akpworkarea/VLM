export interface Interview {
  id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'pending';
  meetingId: string;
  instructions: string[];
}
