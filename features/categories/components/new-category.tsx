import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { insertCategorySchema } from '@/db/schema';

import { useCreateCategory } from '../api/use-create-category';
import { useNewCategory } from '../hooks/use-new-category';

import { CategoryForm } from './category-form';

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

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
          <SheetTitle>Nova categoria</SheetTitle>
          <SheetDescription>
            Crie uma nova categoria para organizar com as transações
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
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
