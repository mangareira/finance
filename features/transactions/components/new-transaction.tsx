import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { insertTransactionSchema } from '@/db/schema';

import { useCreateTransaction } from '../api/use-create-transaction';
import { useNewTransaction } from '../hooks/use-new-transaction';

import { AccountForm } from './account-form';

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const mutation = useCreateTransaction();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 ">
        <SheetHeader>
          <SheetTitle>New account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        {/* <AccountForm
          defaultValues={{
            name: '',
          }}
          disable={mutation.isPending}
          onSubmit={onSubmit}
        /> */}
      </SheetContent>
    </Sheet>
  );
};
