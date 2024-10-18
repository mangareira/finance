import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>;

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.accounts[':id']['$delete']({
        param: { id },
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Account Delete');
    },
    onError: () => {
      toast.error('Failed to delete a account');
    },
  });
  return mutation;
};
