import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { insertCategorySchema } from '@/db/schema';
import { FormProps } from '@/utils/interfaces/form-props';

const formSchema = insertCategorySchema.pick({
  name: true,
});

export type FormValues = z.input<typeof formSchema>;

export const CategoryForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
}: FormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 pt-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="e.g. Comida, viagens, etc."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disable}>
          {id ? 'Salvar mudanças' : 'Criar categoria'}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            disabled={disable}
            type="button"
            variant="outline"
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Deletar categoria
          </Button>
        )}
      </form>
    </Form>
  );
};
