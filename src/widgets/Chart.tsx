'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  LineChart as ReLineChart,
  PieChart as RePieChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  Pie,
  Cell,
  Legend,
} from 'recharts';

type ChartProps = {
  type: 'bar' | 'line' | 'pie';
  data: { name: string; value?: number; color?: string; transations?: string }[]; // Pie chart needs 'value'
  keys?: string[]; // For bar and line charts
  colors?: string[]; // Colors for each dataset
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLegend = ({ payload }: { payload?: any[] }) => {
  if (!payload) return null;
  return (
    <div className='flex justify-center gap-10 mt-7'>
      {payload.map((entry, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }}></span>
            <span className='text-sm font-normal text-gray-600 dark:!text-gray-400'>
              {entry.value}
            </span>
          </div>
          <span className='text-gray-600 text-xs dark:!text-gray-200'>{entry.payload.value}%</span>
        </div>
      ))}
    </div>
  );
};

const Chart = ({ type, data, keys = [], colors = ['#6366F1', '#CBD5E1'] }: ChartProps) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ReBarChart data={data}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip wrapperClassName='capitalize' />
            {keys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={colors[index] || '#6366F1'} />
            ))}
          </ReBarChart>
        );

      case 'line':
        return (
          <ReLineChart data={data}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            {keys.map((key, index) => (
              <Line key={key} type='monotone' dataKey={key} stroke={colors[index] || '#6366F1'} />
            ))}
          </ReLineChart>
        );

      case 'pie':
        return (
          <RePieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend content={<CustomLegend />} />
          </RePieChart>
        );

      default:
        return <p className='text-red-500'>Invalid chart type</p>;
    }
  };

  return (
    <ResponsiveContainer width='100%' height={300}>
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default Chart;
