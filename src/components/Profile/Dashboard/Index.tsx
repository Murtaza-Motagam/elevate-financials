import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';
import { ChartConfig, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import Chart from '@/widgets/Chart';

const accOverviewData = [
  { month: 'January', balance: 186 },
  { month: 'February', balance: 305 },
  { month: 'March', balance: 237 },
  { month: 'April', balance: 73 },
  { month: 'May', balance: 209 },
  { month: 'June', balance: 214 },
];
const chartConfigAccOverview = {
  desktop: {
    label: 'Balance',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const chartDataDtCt = [
  { transactionType: 'Credit', transactions: 275, fill: '#22c55e' },
  { transactionType: 'Debit', transactions: 200, fill: '#dc2626' },
];

const chartConfigDtCt = {
  Credit: {
    label: 'Credit',
  },
  Debit: {
    label: 'Debit',
  },
} satisfies ChartConfig;

const transacData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const trasactionConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const Dashboard = () => {
  return (
    <div className='w-full mx-4'>
      <h1 className='border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl uppercase'>
        Accounts Dashboard
      </h1>
      <div className='w-full grid grid-cols-4 gap-4 pr-5 py-2 h-full'>
        <div className="col-span-2 h-full">
          <Chart
            chartTitle='Account Overview'
            chartDesc='January - November 2024'
            chartFooterHead='Trending up by 5.2% this month'
            chartFooterSubHead='Showing total balance graph of last 11 months'
            config={chartConfigAccOverview}
          >
            <LineChart
              accessibilityLayer
              data={accOverviewData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey='balance'
                type='natural'
                stroke='var(--color-desktop)'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </Chart>
        </div>

        <Chart
          chartTitle='Account Transaction History'
          chartDesc='January - November 2024'
          chartFooterHead='Account transactions increased by 5% this month'
          chartFooterSubHead=' Showing debit/credit transactions of last 11 months'
          config={trasactionConfig}
        >
          <AreaChart
            accessibilityLayer
            data={transacData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
            <Area
              dataKey='mobile'
              type='natural'
              fill='var(--color-mobile)'
              fillOpacity={0.4}
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='desktop'
              type='natural'
              fill='var(--color-desktop)'
              fillOpacity={0.4}
              stroke='var(--color-desktop)'
              stackId='a'
            />
          </AreaChart>
        </Chart>

        <div className="h-full">
          <Chart
            chartTitle='Debit/Credit Transaction History'
            chartDesc='January - November 2024'
            chartFooterHead='Credit transactions increased by 5% this month'
            chartFooterSubHead=' Showing debit/credit transactions of last 11 months'
            config={chartConfigDtCt}
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey='transactionType' hideLabel />} />
              <Pie data={chartDataDtCt} dataKey='transactions' nameKey='transactionType'>
                <LabelList
                  dataKey='transactionType'
                  className='fill-background'
                  stroke='none'
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfigDtCt) => chartConfigDtCt[value]?.label}
                />
              </Pie>
            </PieChart>
          </Chart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
