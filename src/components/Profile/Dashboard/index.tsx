'use client';
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeftRight, IndianRupee } from 'lucide-react';
import Chart from '@/widgets/Chart';
import useDashboard, { latestTransactionType } from './useDashboard';
import { protectedRoutes } from '@/lib/routes';
import DefaultButton from '@/widgets/DefaultButton';
import { useRouter } from 'next/navigation';
import { profile_tabs } from '@/lib/constant';
import PageLoader from '@/shared/Loaders/PageLoader';
import AvatarDefault from '@/widgets/AvatarDefault';
import TextToImage from '@/components/common/TextToImage';
import LazyLoadImg from '@/widgets/LazyLoadImg';

const Dashboard = () => {
  const { bankingRadialData, lineChartData, analyticsData, loading } = useDashboard();
  const router = useRouter();

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center h-screen'>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className='w-full p-2 !pb-10'>
      <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-4'>
        {/* Bar Chart */}
        <Card className='md:col-span-8'>
          <CardContent>
            <div className='space-y-1 my-5'>
              <p className='text-sm text-slate-600 dark:text-gray-300 font-semibold'>
                Balance history
              </p>
              <p className='text-lg font-semibold flex items-center space-x-3'>
                INR &nbsp;
                <IndianRupee size={15} />{' '}
                {analyticsData?.totalRevenue
                  ? `${analyticsData?.totalRevenue?.[0]?.totalBalance}.00`
                  : 0}
              </p>
              <p className='text-xs text-gray-700 dark:text-gray-400'>
                <span className='text-green-500'>▲ 2.1%</span> vs last week
              </p>
            </div>
            <Chart
              type='bar'
              data={analyticsData.transactionHistory}
              colors={['#6366F1', '#60A5FA', '#A78BFA']}
              keys={['name', 'totalAmount', 'totalBalance']}
              keyLabels={{
                name: 'Month',
                totalAmount: 'Total amount',
                totalBalance: 'Balance month end',
              }}
            />
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className='md:col-span-4'>
          <CardContent>
            <div className='text-sm my-5 font-semibold text-slate-600 dark:text-gray-300'>
              <h2 className=''>Transaction type statistics</h2>
              <p className='text-xs mt-1 font-normal text-gray-400'>From created time</p>
            </div>
            <Chart
              type='pie'
              data={analyticsData.transactionType}
              colors={['#6366F1', '#60A5FA', '#A78BFA']}
            />
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
                Last four transaction from your account.
              </p>
              <div className='mt-5'>
                {analyticsData.latestTransactions?.length > 0 ? analyticsData.latestTransactions.map(
                  (val: latestTransactionType, index: number) => (
                    <div
                      key={index}
                      className='flex items-center justify-between gap-x-3 border-b p-2 rounded-[6px] my-1.5'
                    >
                      <div className='flex items-center gap-x-2'>
                        {/* <LazyLoadImg src={val.profileImg} className='w-10 h-10 rounded-full' /> */}
                        {val?.profileImg ? (
                          <AvatarDefault profileImg={val.profileImg} />
                        ) : (
                          <TextToImage nameText={val.name} />
                        )}
                        <p className='text-base font-normal flex flex-col items-start justify-start text-gray-700 dark:text-gray-200'>
                          <span>{val.name}</span>
                          <span className='text-xs text-gray-500 '>{val.accountType}</span>
                        </p>
                      </div>
                      <p className='text-sm font-normal text-gray-700 dark:text-gray-200'>
                        INR {val.amt && `${val.amt}/-`}
                      </p>
                    </div>
                  ),
                ) : (
                  <div className="flex flex-col w-full items-center justify-center">
                    <img src='animations/empty.gif' className='w-40 mt-10' />
                    <p className='mt-5 text-gray-600 dark:text-gray-300'>Looks like no transactions available at the moment.</p>
                  </div>
                )}
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
