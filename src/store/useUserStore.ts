import { create } from 'zustand';
import { User } from '../models/user.model';
import { MOCK_USER } from '../mock/user.mock';

export type UserRole = 'student' | 'parent' | 'teacher';

interface UserState {
  user: User | null;
  role: UserRole | null;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: MOCK_USER,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  clearUser: () => set({ user: null, role: null }),
}));
