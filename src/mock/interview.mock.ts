import { Interview } from '../models/interview.model';

export const MOCK_INTERVIEW: Interview = {
  id: 'int-001',
  date: 'Wednesday, October 25, 2023',
  time: '2:00 PM (IST)',
  status: 'scheduled',
  meetingId: 'VLM-INT-XXXX',
  instructions: [
    'Join from a quiet, professional setting.',
    'Ensure stable high-speed internet.',
    'Use headphones for best audio quality.',
    'Keep relevant documents accessible.',
    'Join 5-10 minutes early.',
    'Focus on clarity and teaching style.'
  ]
};
