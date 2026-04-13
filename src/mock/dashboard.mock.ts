import { DashboardData } from '../models/dashboard.model';

export const MOCK_DASHBOARD: DashboardData = {
  userName: 'Aryan',
  mcqCompleted: 3,
  mcqTotal: 5,
  rank: 12,
  rankChange: 3,
  rewardPoints: 1250,
  spinAvailableAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 mins from now
  liveClass: {
    subject: 'JEE Main',
    topic: 'Organic Chemistry',
    teacher: 'Dr. Sharma',
    time: '2:00 PM IST (Today)',
    teacherAvatar: 'https://picsum.photos/seed/teacher/100/100',
    startTime: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
  },
  shortSessions: [
    {
      id: '1',
      title: '5 Min: Complex Numbers Trick',
      teacher: 'A. Teacher',
      thumbnail: 'https://picsum.photos/seed/session1/300/200',
      duration: '5:00',
    },
    {
      id: '2',
      title: 'Quick Integration Hacks',
      teacher: 'B. Teacher',
      thumbnail: 'https://picsum.photos/seed/session2/300/200',
      duration: '4:30',
    },
  ],
  shortVideos: [
    {
      id: '1',
      title: 'Physics Tips',
      thumbnail: 'https://picsum.photos/seed/video1/200/300',
      views: '1.2k',
    },
    {
      id: '2',
      title: 'Chemistry Lab',
      thumbnail: 'https://picsum.photos/seed/video2/200/300',
      views: '800',
    },
    {
      id: '3',
      title: 'Math Logic',
      thumbnail: 'https://picsum.photos/seed/video3/200/300',
      views: '2.5k',
    },
  ],
};
