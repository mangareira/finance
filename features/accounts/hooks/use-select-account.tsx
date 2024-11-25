import { useRef, useState, type JSX } from 'react';

import { Select } from '@/components/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useCreateAccount } from '../api/use-create-account';
import { useGetAccounts } from '../api/use-get-accounts';

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>,
] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfimationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione um conta</DialogTitle>
          <DialogDescription>
            Por favor selecione uma conta para continuar
          </DialogDescription>
        </DialogHeader>
        <Select
          disable={accountQuery.isLoading || accountMutation.isPending}
          options={accountOptions}
          placeholder="Selecione uma conta"
          onChange={(value) => (selectValue.current = value)}
          onCreate={onCreateAccount}
        />
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="outline" onClick={handleConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfimationDialog, confirm];
};
