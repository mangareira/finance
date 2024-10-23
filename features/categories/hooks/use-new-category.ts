import { create } from 'zustand';

import { newCategoryType } from '@/utils/interfaces/new-category';

export const useNewCategory = create<newCategoryType>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
