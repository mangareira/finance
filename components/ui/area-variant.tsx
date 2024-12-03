import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { ChartsProps } from '@/utils/interfaces/chart-props';

import { CustomTooltip } from './custom-tooltip';

export const AreaVariant = ({ data }: ChartsProps) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1="0" x2="0" y1="0" y2="1">
            <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" x2="0" y1="0" y2="1">
            <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          dataKey="date"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => format(value, 'dd MMM', { locale: ptBR })}
          tickLine={false}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          className="drop-shadow-sm"
          dataKey="income"
          fill="url(#income)"
          stackId="income"
          stroke="#3d82f6"
          strokeWidth={2}
          type="monotone"
        />
        <Area
          className="drop-shadow-sm"
          dataKey="expenses"
          fill="url(#expenses)"
          stackId="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
