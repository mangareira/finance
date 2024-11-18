import { useState } from 'react';

import { format, parse } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertAmountToMiliunitis } from '@/lib/utils';
import { ImportCardProps } from '@/utils/interfaces/import-card-props';
import { SelectColumnsState } from '@/utils/interfaces/select-columns-state';

import { columns } from './columns';
import { ImportTable } from './import-table';

const dateFormt = 'yyyy-MM-dd HH:mm:ss';
const outputFormt = 'yyyy-MM-dd';

const requiredOptions = ['amount', 'date', 'payee'];

export const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
  const [selectedColumns, setSelectColumns] = useState<SelectColumnsState>({});

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === 'skip') {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformRow.every((item) => item === null)
            ? []
            : transformRow;
        })
        .filter((row) => row.length > 0),
    };

    const arryOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arryOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunitis(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormt, new Date()), outputFormt),
    }));

    onSubmit(formattedData);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Importar Transação
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button className="w-full lg:w-auto" size={'sm'} onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              className="w-full lg:w-auto"
              disabled={progress < requiredOptions.length}
              size="sm"
              onClick={handleContinue}
            >
              Continuar ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            body={body}
            headers={headers}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
