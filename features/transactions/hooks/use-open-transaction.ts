import { create } from 'zustand';

import { OpenTransactionType } from '@/utils/interfaces/open-transaction';

export const useOpenTransaction = create<OpenTransactionType>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));
