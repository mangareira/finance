'use client';
import { useState } from 'react';

import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { transactions as transactionSchema } from '@/db/schema';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { useCreateBulkTransactions } from '@/features/transactions/api/use-create-bulk-transaction';
import { useDeleteBulkTransactions } from '@/features/transactions/api/use-delete-bulk-transaction';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { VARIANTS } from '@/utils/interfaces/enun-variants';

import { columns } from './columns';
import { ImportCard } from './import-card';
import { UploadButton } from './upload-button';

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionPage() {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransaction = useNewTransaction();
  const createTransactions = useCreateBulkTransactions();
  const deleteTransactions = useDeleteBulkTransactions();
  const transactionQuery = useGetTransactions();
  const transaction = transactionQuery.data || [];
  console.log(transaction);

  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

  const onSubmitImport = async (
    values: (typeof transactionSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();
    if (!accountId) {
      return toast.error('Por favor selecione uma conat para continuar.');
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex justify-center items-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Historico de Transações
          </CardTitle>
          <div className="flex items-center gap-x-2 flex-col lg:flex-row gap-y-2">
            <Button
              className="w-full lg:w-auto"
              size={'sm'}
              onClick={newTransaction.onOpen}
            >
              <Plus className="size-4 mr-2" />
              Adcionar
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transaction}
            disabled={isDisabled}
            filterkey="payee"
            placeholder="Beneficiario"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
