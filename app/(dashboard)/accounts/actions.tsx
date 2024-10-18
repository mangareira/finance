'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useConfirm } from '@/hooks/use-confirm';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar uma transação'
  );

  const { onOpen } = useOpenAccount();
  const deleteAccount = useDeleteAccount(id);

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAccount.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteAccount.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteAccount.isPending}
            onClick={onDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
