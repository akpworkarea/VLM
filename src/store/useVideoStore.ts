import { create } from 'zustand';
import { Video } from '../models/video.model';

interface VideoState {
  currentVideo: Video | null;
  selectedSubjectId: string | null;
  setVideo: (video: Video | null) => void;
  setSubject: (subjectId: string | null) => void;
  reset: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideo: null,
  selectedSubjectId: null,
  setVideo: (video) => set({ currentVideo: video }),
  setSubject: (subjectId) => set({ selectedSubjectId: subjectId }),
  reset: () => set({ currentVideo: null, selectedSubjectId: null }),
}));
