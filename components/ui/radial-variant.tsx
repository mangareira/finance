import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

import { formatCurrency } from '@/lib/utils';
import { SpendingPieProps } from '@/utils/interfaces/spending-pie-props';

const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354'];

export const RadialVariant = ({ data }: SpendingPieProps) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <RadialBarChart
        barSize={10}
        cx="50%"
        cy="30%"
        data={data?.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }))}
        innerRadius="90%"
        outerRadius="40%"
      >
        <RadialBar
          background
          dataKey="value"
          label={{
            position: 'insideStart',
            fill: '#fff',
            fontSize: '12px',
          }}
        />
        <Legend
          align="right"
          content={({ payload }) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry, index) => (
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
                        {formatCurrency(entry.payload?.value)}
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
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
