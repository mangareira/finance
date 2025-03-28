import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.categories)['bulk-delete']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)['bulk-delete']['$post']
>['json'];

export const useDeleteBulkCategories = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.categories['bulk-delete']['$post']({ json });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Categorias deletadas');
      queryClient.invalidateQueries({ queryKey: ['Categories'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Falha ao deletar categorias');
    },
  });
  return mutation;
};
