import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { ChartsProps } from '@/utils/interfaces/chart-props';

import { CustomTooltip } from './custom-tooltip';

export const BarVariant = ({ data }: ChartsProps) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          dataKey="date"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => format(value, 'dd MMM', { locale: ptBR })}
          tickLine={false}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar className="drop-shadow-sm" dataKey="income" fill="#3b82f6" />
        <Bar className="drop-shadow-sm" dataKey="expenses" fill="#f43f5e" />
      </BarChart>
    </ResponsiveContainer>
  );
};
