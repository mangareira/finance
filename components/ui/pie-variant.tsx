import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { formatPercentage } from '@/lib/utils';
import { SpendingPieProps } from '@/utils/interfaces/spending-pie-props';

import { CategoryTooltip } from './category-tooltip';

const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354'];

export const PieVariant = ({ data }: SpendingPieProps) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <PieChart>
        <Legend
          align="right"
          content={({ payload }) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry: any, index) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {formatPercentage(entry.payload.percent * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          fill="#8884d8"
          innerRadius={60}
          labelLine={false}
          outerRadius={90}
          paddingAngle={2}
        >
          {data?.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
