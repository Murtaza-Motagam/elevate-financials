import { Card } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import React from 'react';
import { AccountTabsProps } from '../AccountTabs';

const Cards = ({ accInfo }: AccountTabsProps) => {
  console.log('accInfo: ', accInfo);
  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>Credit & Debit cards</h2>
      <Card className='p-4 flex justify-between items-center  rounded-xl'>
        <div>
          <p className='dark:text-gray-300'>Platinum credit card</p>
          <h3 className='text-lg font-bold italic'>**** **** **** 1234</h3>
          <p className='text-sm text-red-500'>Exp: 09/27</p>
        </div>
        <CreditCard className='w-8 h-8 text-primary dark:text-white' />
      </Card>
    </div>
  );
};

export default Cards;
