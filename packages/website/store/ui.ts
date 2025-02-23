import { create } from "zustand";

type UiStore = {
  isLoginModalOpen: boolean;
  toggleLoginModal: (shouldOpen: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isLoginModalOpen: false,
  toggleLoginModal: (shouldOpen) => set({ isLoginModalOpen: shouldOpen }),
}));
