import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

import { SpendingPieProps } from '@/utils/interfaces/spending-pie-props';

export const RadarVariant = ({ data }: SpendingPieProps) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <RadarChart cx="50%" cy="50%" data={data} outerRadius="60%">
        <PolarGrid />
        <PolarAngleAxis dataKey="name" style={{ fontSize: '12px' }} />
        <PolarRadiusAxis style={{ fontSize: '12px' }} />
        <Radar
          dataKey="value"
          fill="#3b82f6"
          fillOpacity={0.6}
          stroke="#3b82f6"
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
