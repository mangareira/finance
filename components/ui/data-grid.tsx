'use client';

import { useSearchParams } from 'next/navigation';
import { FaPiggyBank } from 'react-icons/fa';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

import { useGetSummary } from '@/features/summary/api/use-get-summary';
import { formatDateRange } from '@/lib/utils';

import { DataCard, DataCardLoading } from './data-card';

export const DataGrid = () => {
  const { data, isLoading } = useGetSummary();

  const params = useSearchParams();
  const to = params.get('to') || undefined;
  const from = params.get('from') || undefined;

  const dateRangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        dateRange={dateRangeLabel}
        icon={FaPiggyBank}
        percentageChange={data?.remainingChange}
        title="Restante"
        value={data?.remainingAmount}
      />
      <DataCard
        dateRange={dateRangeLabel}
        icon={FaArrowTrendUp}
        percentageChange={data?.incomeChange}
        title="Renda"
        value={data?.incomeAmount}
      />
      <DataCard
        dateRange={dateRangeLabel}
        icon={FaArrowTrendDown}
        percentageChange={data?.expensesChange}
        title="Despesas"
        value={data?.expensesAmount}
      />
    </div>
  );
};
