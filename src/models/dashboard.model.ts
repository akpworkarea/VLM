export interface DashboardData {
  userName: string;
  mcqCompleted: number;
  mcqTotal: number;
  rank: number;
  rankChange: number;
  rewardPoints: number;
  spinAvailableAt: string;
  liveClass: {
    subject: string;
    topic: string;
    teacher: string;
    time: string;
    teacherAvatar: string;
    startTime: string;
  };
  shortSessions: Array<{
    id: string;
    title: string;
    teacher: string;
    thumbnail: string;
    duration: string;
  }>;
  shortVideos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    views: string;
  }>;
}
