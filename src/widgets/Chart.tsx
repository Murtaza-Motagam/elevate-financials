'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  LineChart as ReLineChart,
  PieChart as RePieChart,
  RadialBarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  Pie,
  Cell,
  Legend,
  RadialBar,
  CartesianGrid,
} from 'recharts';

type ChartProps = {
  type: 'bar' | 'line' | 'pie' | 'radialChart';
  data: { name: string; value?: number; color?: string; transactions?: number }[]; // Pie & Radial charts use 'value'
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
          <ResponsiveContainer width='100%' height={300}>
            <ReLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis dataKey='name' tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip wrapperClassName='capitalize' />
              {keys.map((key, index) => (
                <Line
                  key={key}
                  type='monotone'
                  dataKey={key}
                  stroke={colors[index] || '#6366F1'}
                  strokeWidth={2.5}
                  dot={{ r: 4, stroke: '#fff', strokeWidth: 2 }}
                />
              ))}
            </ReLineChart>
          </ResponsiveContainer>
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
      case 'radialChart':
        return (
          <div className='flex gap-6 justify-center items-center flex-wrap'>
            {data.map((item, index) => (
              <div key={index} className='relative'>
                <ResponsiveContainer
                  width={100 + (item.value ?? 0) / 2}
                  height={100 + (item.value ?? 0) / 2}
                >
                  <RadialBarChart
                    cx='50%'
                    cy='50%'
                    innerRadius='80%'
                    outerRadius='100%'
                    barSize={10}
                    data={[item]} // Wrapping item in an array for RadialBar
                    startAngle={90}
                    endAngle={90 + (360 * (item.value ?? 0)) / 100}
                  >
                    <RadialBar
                      background
                      dataKey='value'
                      fill={item.color || '#6366F1'}
                      cornerRadius={50}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                  <span className='text-xl font-bold'>{item.value}%</span>
                  <p className='text-sm text-gray-500'>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
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
