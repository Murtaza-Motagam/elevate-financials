import { transactionType } from '@/lib/constant';
import InputField from '@/widgets/Input';
import LayoutSheet from '@/widgets/LayoutSheet';
import SingleSelect from '@/widgets/SingleSelect';
import React, { SetStateAction } from 'react';
import useAddTransaction from '../hooks/useAddTransaction';
import DefaultButton from '@/widgets/DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';

interface AddTransactionProps {
  open: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  getTransaction?: () => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({
  open,
  setOpen = () => {},
  getTransaction = () => {},
}) => {
  const { hookform, ...dt } = useAddTransaction({ setOpen, getTransaction });

  return (
    <LayoutSheet open={open} setOpen={dt.closeModal}>
      <div className='h-full w-full flex flex-col justify-between'>
        <div className='grid grid-cols-1 gap-5'>
          <h1 className='-mt-2 font-bold text-2xl border-b pb-3'>Create Transaction</h1>
          <InputField
            label='Reciever A/C'
            rest={hookform.register('receiverAccNum')}
            placeholder='Enter reciever account number'
            error={hookform.errors?.receiverAccNum?.message}
            mandatory
          />
          <InputField
            label='Amount'
            rest={hookform.register('amt')}
            placeholder='Type amount'
            error={hookform.errors?.amt?.message}
            mandatory
          />
          <InputField
            label='Remarks'
            rest={hookform.register('remarks')}
            placeholder='Remarks (optional)'
            type='text'
          />
          <SingleSelect
            name='transactionTypeNm'
            control={hookform.control}
            label='Transaction type'
            placeholder='Select transaction type'
            options={transactionType}
            dropdownClasses='md:w-[330px]'
            error={hookform.errors.transactionTypeNm?.message}
            mandatory
          />
        </div>
        <div className='gap-x-2 flex items-center justify-end'>
          <DefaultButton
            title='Cancel'
            className='text-center rounded-[5px]'
            variant='outline'
            onClick={dt.closeModal}
          />
          <DefaultButton
            icon={dt.loading && <RollLoader />}
            onClick={hookform.handleSubmit(dt.createTransaction)}
            type='submit'
            title={!dt.loading ? 'Create Transaction' : 'Processing'}
            className='text-center rounded-[5px]'
            loading={dt.loading}
          />
        </div>
      </div>
    </LayoutSheet>
  );
};

export default AddTransaction;
