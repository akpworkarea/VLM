import { create } from 'zustand';
import { User } from '../models/user.model';
import { MOCK_USER } from '../mock/user.mock';
import { StudentProfile } from '../models/student.model';
import { Plan } from '../models/plan.model';

export type UserRole = 'student' | 'parent' | 'teacher';

interface UserState {
  user: User | null;
  role: UserRole | null;
  studentProfile: StudentProfile | null;
  selectedPlan: Plan | null;
  aiCredits: {
    used: number;
    total: number;
  };
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  setStudentProfile: (profile: StudentProfile) => void;
  setSelectedPlan: (plan: Plan) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: MOCK_USER,
  role: null,
  studentProfile: null,
  selectedPlan: null,
  aiCredits: {
    used: 1250,
    total: 2000,
  },
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setStudentProfile: (studentProfile) => set({ studentProfile }),
  setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
  clearUser: () => set({ 
    user: null, 
    role: null, 
    studentProfile: null, 
    selectedPlan: null 
  }),
}));
