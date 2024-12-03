import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { ChartsProps } from '@/utils/interfaces/chart-props';

import { CustomTooltip } from './custom-tooltip';

export const LineVariant = ({ data }: ChartsProps) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <LineChart data={data}>
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
        <Line
          className="drop-shadow-sm"
          dataKey="income"
          dot={false}
          stroke="#3b82f6"
          strokeWidth={2}
        />
        <Line
          className="drop-shadow-sm"
          dataKey="expenses"
          dot={false}
          stroke="#f43f5e"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
