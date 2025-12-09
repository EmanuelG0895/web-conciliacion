'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Types
interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ChartDataKey {
  key: string;
  color: string;
  strokeColor?: string;
  name?: string;
}

interface BarChartRootProps {
  data: ChartData[];
  dataKeys: ChartDataKey[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  barRadius?: number;
  barSize?: number;
  barGap?: number;
  barCategoryGap?: string | number;
}

interface ChartLegendProps {
  dataKeys: ChartDataKey[];
  className?: string;
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border-2 border-blue-500 bg-white p-3 text-sm font-semibold shadow-lg dark:border-blue-400 dark:bg-gray-800">
      <p className="mb-2 font-bold text-gray-900 dark:text-gray-100">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p
          key={`item-${index}`}
          className="text-xs text-gray-700 dark:text-gray-300"
          style={{ color: entry.color }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

// Chart Legend Component
const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ dataKeys, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mt-4 flex items-center justify-center gap-4',
          className,
        )}
      >
        {dataKeys.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.name || item.key}
            </span>
          </div>
        ))}
      </div>
    );
  },
);

ChartLegend.displayName = 'ChartLegend';

// Main Bar Chart Component
const BarChartRoot = React.forwardRef<HTMLDivElement, BarChartRootProps>(
  (
    {
      data,
      dataKeys,
      height = 350,
      className,
      showGrid = true,
      showTooltip = true,
      showLegend = false,
      barRadius = 6,
      barSize = 20,
      barGap = 4,
      barCategoryGap = '20%',
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={clsx('w-full', className)} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            barGap={barGap}
            barCategoryGap={barCategoryGap}
          >
            <defs>
              {dataKeys.map((dataKey) => (
                <linearGradient
                  key={`gradient-${dataKey.key}`}
                  id={`gradient-${dataKey.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={dataKey.color} stopOpacity={1} />
                  <stop
                    offset="100%"
                    stopColor={dataKey.color}
                    stopOpacity={0.8}
                  />
                </linearGradient>
              ))}
            </defs>

            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                className="dark:stroke-gray-700"
              />
            )}

            <XAxis
              dataKey="name"
              stroke="#D1D5DB"
              tick={{
                fill: '#6B7280',
                fontWeight: 600,
                fontSize: 12,
              }}
              tickLine={{ stroke: '#D1D5DB' }}
              className="dark:stroke-gray-600"
            />

            <YAxis
              stroke="#D1D5DB"
              tick={{
                fill: '#6B7280',
                fontWeight: 600,
                fontSize: 12,
              }}
              tickLine={{ stroke: '#D1D5DB' }}
              className="dark:stroke-gray-600"
            />

            {showTooltip && (
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
            )}

            {showLegend && (
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                }}
                iconType="square"
                formatter={(value: any) => {
                  const dataKey = dataKeys.find((dk) => dk.key === value);
                  return (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dataKey?.name || value}
                    </span>
                  );
                }}
              />
            )}

            {dataKeys.map((dataKey) => (
              <Bar
                key={dataKey.key}
                dataKey={dataKey.key}
                fill={`url(#gradient-${dataKey.key})`}
                stroke={dataKey.strokeColor || dataKey.color}
                strokeWidth={1}
                radius={[barRadius, barRadius, 0, 0]}
                maxBarSize={barSize}
                name={dataKey.name || dataKey.key}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

BarChartRoot.displayName = 'BarChartRoot';

export { BarChartRoot, ChartLegend };
export type { BarChartRootProps, ChartData, ChartDataKey, ChartLegendProps };
