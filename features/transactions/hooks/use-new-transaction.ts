import { create } from 'zustand';

import { newTransactionType } from '@/utils/interfaces/new-transaction';

export const useNewTransaction = create<newTransactionType>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
