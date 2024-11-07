'use client';

import { useMountedState } from 'react-use';

import { EditAccountSheet } from '@/features/accounts/components/edit-account';
import { NewAccountSheet } from '@/features/accounts/components/new-account';
import { EditCategorySheet } from '@/features/categories/components/edit-category';
import { NewCategorySheet } from '@/features/categories/components/new-category';
import { EditTransactionSheet } from '@/features/transactions/components/edit-transaction';
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction';

export const SheetProvider = () => {
  const isMonted = useMountedState();
  if (!isMonted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorySheet />
      <EditCategorySheet />
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
};
