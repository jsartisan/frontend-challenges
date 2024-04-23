import { create } from "zustand";

type User = {
  id: string;
  user_name: string;
  name: string;
  avatar_url: string | null;
};

type AuthStore = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  user: User | null;
  setUser: (user: User) => void;
  isSessionLoading: boolean;
  setSessionLoading: (isSessionLoading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),
  user: null,
  setUser: (user) => set({ user, isLoading: false }),
  isSessionLoading: true,
  setSessionLoading: (isSessionLoading) => set({ isSessionLoading }),
}));
