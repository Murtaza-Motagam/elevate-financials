'use client';
import React, { useRef, useState } from 'react';
import { ChevronDown, Download, FilePlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useClickOutside from '@/hooks/useClickOutside';
import DefaultButton from '@/widgets/DefaultButton';
import useTransaction from './hooks/useTransaction';
import AddTransaction from './Form/AddTransaction';
import TransactionDetails from './Form/TransactionDetails';
import Table from '@/widgets/Table';

const Transactions = () => {
  const [ddOpen, setDdOpen] = useState<boolean>(false);
  const [openTransactionModal, setTransactionOpen] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropdownRef, () => setDdOpen(false));

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
        <div ref={dropdownRef} className='w-full md:w-auto relative flex items-center'>
          <DefaultButton
            onClick={() => setTransactionOpen(true)}
            className='rounded-r-none w-full md:w-auto'
            icon={<FilePlus />}
            title='Create transaction'
          />
          <Button onClick={() => setDdOpen(!ddOpen)} className='rounded-l-none px-2 border-l-2'>
            <ChevronDown />
          </Button>

          {ddOpen && (
            <Button
              variant='outline'
              className='w-full md:w-[200px] absolute top-10 right-0 rounded-[5px] bg-white text-black dark:hover:bg-gray-700 z-10'
            >
              <Download />
              Download history
            </Button>
          )}
        </div>
      </div>
      <Table
        columns={dt.columns}
        data={invoices}
        className='mt-7'
        loading={dt.loading}
        onRowClick={(row) => dt.handleTransactionDetails(row, setDetailsOpen)}
      />

      <AddTransaction
        open={openTransactionModal}
        setOpen={setTransactionOpen}
        getTransaction={dt.getTransactions}
      />

      <TransactionDetails open={detailsOpen} setOpen={setDetailsOpen} data={dt.trData} />
    </div>
  );
};

export default Transactions;
