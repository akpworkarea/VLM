import { create } from 'zustand';
import { User } from '../models/user.model';
import { MOCK_USER } from '../mock/user.mock';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: MOCK_USER,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
