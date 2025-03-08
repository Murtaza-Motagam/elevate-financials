'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import Chart from '@/widgets/Chart';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { barChartData, pieChartData } = useDashboard();

  return (
    <div className='w-full p-2 !pb-10'>
      <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-x-4'>
        {/* Bar Chart */}
        <Card className='col-span-8'>
          <CardContent>
            <div className='space-y-1 my-5'>
              <p className='text-sm text-slate-600 dark:text-gray-300 font-semibold'>Revenue</p>
              <p className='text-lg font-semibold flex items-center space-x-3'>
                INR &nbsp;
                <IndianRupee size={15} /> 7,852.00
              </p>
              <p className='text-xs text-gray-700 dark:text-gray-400'>
                <span className='text-green-500'>▲ 2.1%</span> vs last week
              </p>
            </div>
            <Chart
              type='bar'
              data={barChartData}
              colors={['#6366F1', '#60A5FA', '#A78BFA']}
              keys={['revenue', 'transactions']}
            />
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className='col-span-4'>
          <CardContent>
            <div className='text-sm my-5 font-semibold text-slate-600 dark:text-gray-300'>
              <h2 className=''>Order time</h2>
              <p className='text-xs mt-1 font-normal text-gray-400'>From 1 - 6 Dec 2024</p>
            </div>
            <Chart type='pie' data={pieChartData} colors={['#6366F1', '#60A5FA', '#A78BFA']} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
