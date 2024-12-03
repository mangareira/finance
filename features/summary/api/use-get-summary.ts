import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';
import { convertAmountFromMiliunitis } from '@/lib/utils';

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const accountId = params.get('accountId') || '';

  const query = useQuery({
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) throw new Error('failed to fecth transactions');
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMiliunitis(data.incomeAmount),
        expensesAmount: convertAmountFromMiliunitis(data.expensesAmount),
        remainingAmount: convertAmountFromMiliunitis(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMiliunitis(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMiliunitis(day.income),
          expenses: convertAmountFromMiliunitis(day.expenses),
        })),
      };
    },
  });
  return query;
};
