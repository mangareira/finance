'use client';

import { useMountedState } from 'react-use';

import { EditAccountSheet } from '@/features/accounts/components/edit-account';
import { NewAccountSheet } from '@/features/accounts/components/new-account';

export const SheetProvider = () => {
  const isMonted = useMountedState();
  if (!isMonted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
