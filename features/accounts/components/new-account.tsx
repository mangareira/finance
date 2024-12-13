import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { insertAccountSchema } from '@/db/schema';

import { useCreateAccount } from '../api/use-create-account';
import { useNewAccount } from '../hooks/use-new-accounts';

import { AccountForm } from './account-form';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

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
          <SheetTitle>Nova conta</SheetTitle>
          <SheetDescription>
            Crie uma nova conta para rastrear suas transações.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          defaultValues={{
            name: '',
          }}
          disable={mutation.isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};
