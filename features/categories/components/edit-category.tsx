import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { insertCategorySchema } from '@/db/schema';
import { useConfirm } from '@/hooks/use-confirm';

import { useDeleteCategory } from '../api/use-delete-category';
import { useEditCategory } from '../api/use-edit-category';
import { useGetCategory } from '../api/use-get-category';
import { useOpenCategory } from '../hooks/use-open-category';

import { CategoryForm } from './category-form';

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar uma categoria.'
  );

  const categoryQuery = useGetCategory(id);

  const editMutation = useEditCategory(id);

  const deleteCategory = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteCategory.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteCategory.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 ">
          <SheetHeader>
            <SheetTitle>Editar categoria</SheetTitle>
            <SheetDescription>Edite uma categoria existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              defaultValues={defaultValues}
              disable={isPending}
              id={id}
              onDelete={onDelete}
              onSubmit={onSubmit}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
