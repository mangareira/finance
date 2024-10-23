import { create } from 'zustand';

import { OpenCategoryType } from '@/utils/interfaces/open-category';

export const useOpenCategory = create<OpenCategoryType>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));
