'use client';
import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DefaultButton from '@/widgets/DefaultButton';
import useTransaction from './hooks/useTransaction';
import TransactionDetails from './Form/TransactionDetails';
import Table from '@/widgets/Table';

const Transactions = () => {
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const { invoices, ...dt } = useTransaction();

  return (
    <div className='w-full mx-4 pr-4'>
      <h1 className='border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl'>
        Transactions
      </h1>
      <div className='w-full flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between items-center my-3'>
        <div className='w-full md:w-1/3'>
          <div className='relative w-full'>
            <Search
              size={20}
              className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400'
            />
            <Input type='text' placeholder='Type Transaction ID to search' className='pl-10' />
          </div>
        </div>
        <DefaultButton
          className='rounded-md w-full md:w-auto'
          icon={<Download />}
          title='Download history'
        />
      </div>
      <Table
        columns={dt.columns}
        data={invoices}
        className='mt-7'
        loading={dt.loading}
        onRowClick={(row) => dt.handleTransactionDetails(row, setDetailsOpen)}
      />

      <TransactionDetails open={detailsOpen} setOpen={setDetailsOpen} data={dt.trData} />
    </div>
  );
};

export default Transactions;
