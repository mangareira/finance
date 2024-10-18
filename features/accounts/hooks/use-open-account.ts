import { create } from 'zustand';

import { OpenAccountType } from '@/utils/interfaces/open-account';

export const useOpenAccount = create<OpenAccountType>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));
