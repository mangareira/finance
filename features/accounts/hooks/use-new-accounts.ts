import { create } from 'zustand';

import { newAccountType } from '@/utils/interfaces/new-accounts';

export const useNewAccount = create<newAccountType>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
