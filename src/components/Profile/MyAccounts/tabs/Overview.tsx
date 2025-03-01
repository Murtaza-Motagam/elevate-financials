import { Card } from '@/components/ui/card';
import { Banknote, CreditCard, User } from 'lucide-react';
import React from 'react';
import { AccountTabsProps } from '../AccountTabs';
import { formatWithCommas } from '@/lib/common';

const Overview = ({ accInfo }: AccountTabsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Card className='p-4 flex items-center gap-3 bg-slate-100 dark:bg-slate-900'>
        <Banknote className='w-6 h-6 text-blue-600' />
        <div>
          <p className='dark:text-gray-300'>Savings Balance</p>
          <h3 className='text-lg font-bold'>${formatWithCommas(accInfo?.balance)}</h3>
        </div>
      </Card>
      <Card className='p-4 flex items-center gap-3 bg-slate-100 dark:bg-slate-900'>
        <CreditCard className='w-6 h-6 text-green-600' />
        <div>
          <p className='dark:text-gray-300'>Credit Card Due</p>
          <h3 className='text-lg font-bold'>$230.00</h3>
        </div>
      </Card>
      <Card className='p-4 flex items-center gap-3 bg-slate-100 dark:bg-slate-900'>
        <User className='w-6 h-6 text-purple-600' />
        <div>
          <p className='dark:text-gray-300'>Beneficiaries</p>
          <h3 className='text-lg font-bold'>4 Linked</h3>
        </div>
      </Card>
    </div>
  );
};

export default Overview;
