'use client';
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeftRight, IndianRupee } from 'lucide-react';
import Chart from '@/widgets/Chart';
import useDashboard from './useDashboard';
import { protectedRoutes } from '@/lib/routes';
import DefaultButton from '@/widgets/DefaultButton';
import { useRouter } from 'next/navigation';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { profile_tabs } from '@/lib/constant';

const Dashboard = () => {
  const { barChartData, pieChartData, bankingRadialData, lineChartData } = useDashboard();
  const router = useRouter();

  return (
    <div className='w-full p-2 !pb-10'>
      <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-4'>
        {/* Bar Chart */}
        <Card className='md:col-span-8'>
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
        <Card className='md:col-span-4'>
          <CardContent>
            <div className='text-sm my-5 font-semibold text-slate-600 dark:text-gray-300'>
              <h2 className=''>Accounts stats</h2>
              <p className='text-xs mt-1 font-normal text-gray-400'>
                From 1 february - 1 march 2025
              </p>
            </div>
            <Chart type='pie' data={pieChartData} colors={['#6366F1', '#60A5FA', '#A78BFA']} />
          </CardContent>
        </Card>
      </div>

      <div className='w-full mt-2 grid grid-cols-1 md:grid-cols-12 gap-2'>
        {/* Radial chart */}
        <Card className='hidden md:grid md:col-span-4'>
          <CardContent>
            <div className='text-sm my-5 font-semibold text-slate-600 dark:text-gray-300'>
              <h2 className=''>Accounts usage</h2>
              <p className='text-xs mt-1 font-normal text-gray-400'>
                From 1 february - 1 march 2025
              </p>
            </div>
            <Chart
              type='radialChart'
              data={bankingRadialData}
              colors={['#3498db', '#e74c3c', '#f1c40f', '#2ecc71']}
            />
          </CardContent>
        </Card>

        {/* Recent transation list */}
        <Card className='md:col-span-4 flex flex-col justify-between'>
          <CardContent>
            <div className='text-sm my-5 font-semibold text-slate-600 dark:text-gray-300'>
              <h2 className=''>Recent transactions</h2>
              <p className='text-xs mt-1 font-normal text-gray-400'>
                From 1 february - 1 march 2025
              </p>
              <div className='mt-5'>
                {[1, 2, 3, 4].map((val) => (
                  <div
                    key={val}
                    className='flex items-center justify-between gap-x-3 border-b p-2 rounded-[6px] my-1.5'
                  >
                    <div className='flex items-center gap-x-2'>
                      <LazyLoadImg src='/images/logo.png' className='w-10 h-10' />
                      <p className='text-base font-normal flex flex-col items-start justify-start text-gray-700 dark:text-gray-200'>
                        <span>Jane smith</span>
                        <span className='text-xs text-gray-500 '>[ Current A/C ]</span>
                      </p>
                    </div>
                    <p className='text-sm font-normal text-gray-700 dark:text-gray-200'>
                      INR 9000/-
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <DefaultButton
              title='View all transactions'
              onClick={() =>
                router.push(`${protectedRoutes.profile}?tab=${profile_tabs.transaction}`)
              }
              className='w-full'
              variant='outline'
              icon={<ArrowLeftRight />}
            />
          </CardFooter>
        </Card>

        {/* Line charts */}

        <Card className='md:col-span-4'>
          <CardContent>
            <div className='text-sm my-5 font-semibold text-slate-600 dark:text-gray-300'>
              <h2 className=''>Visiting duration</h2>
              <p className='text-xs mt-1 font-normal text-gray-400'>
                From 1 february - 1 march 2024
              </p>
            </div>
            <Chart
              type='line'
              data={lineChartData}
              keys={['name', 'value']}
              colors={['#3498db', '#e74c3c', '#f1c40f', '#2ecc71']}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
