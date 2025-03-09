'use client';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import InputField from '@/widgets/Input';
import SingleSelect from '@/widgets/SingleSelect';
import RollLoader from '@/shared/Loaders/RollLoader';
import DefaultButton from '@/widgets/DefaultButton';
import useAddTransaction from '@/components/Profile/Transactions/hooks/useAddTransaction';
import { transactionType } from '@/lib/constant';
import SuccessModal from '@/widgets/Modals/SuccessModal';

const OneTimeTransfer = () => {
  const { hookform, ...dt } = useAddTransaction({});
  return (
    <LayoutWrapper childClass='!min-h-0'>
      <div className='grid grid-cols-1 md:grid-cols-2 h-[700px] p-0 mb-5'>
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='hidden relative bg-gradient-to-br from-purple-500 to-purple-700 dark:bg-none dark:from-[#121826] dark:to-[#1a1f2e] text-white md:flex flex-col justify-center items-center p-8 rounded-none shadow-xl'
        >
          {/* Background Pattern */}
          <div className='absolute inset-0 bg-opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-800 to-transparent dark:from-gray-900'></div>

          {/* Content Wrapper */}
          <div className='relative z-10 text-center'>
            {/* Title */}
            <h2 className='text-3xl font-extrabold tracking-wide'>Your trusted banking partner</h2>

            {/* Description */}
            <p className='mt-3 text-lg text-gray-200 max-w-md mx-auto'>
              We provide secure and seamless banking solutions to help you manage your finances with
              ease and confidence.
            </p>

            {/* Bank Logo */}
            <div className='mt-6 flex items-center justify-center space-x-2'>
              <div className='p-2 bg-white dark:bg-gray-900 rounded-full shadow-md'>
                <LazyLoadImg src='/images/logo.png' className='w-16 h-16' />
              </div>
            </div>

            {/* Tagline */}
            <div className='flex flex-col items-center mt-6'>
              <p className='text-base text-gray-300 flex flex-wrap justify-center'>
                <span className='text-white font-bold uppercase'>Elevate</span>
                <span className='ml-1 text-tertiary dark:text-white font-bold'>Financials</span> -
                Empowering your financial future.
              </p>

              {/* Decorative line */}
              <div className='w-24 h-1 bg-tertiary dark:bg-white rounded-full mt-2'></div>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex items-center justify-center m-2 mb-10 md:-mt-5'
        >
          <Card className='w-full md:max-w-md py-2 md:p-6 shadow-lg bg-slate-100 dark:bg-slate-900 rounded-none md:rounded-[6px]'>
            <CardHeader>
              <CardTitle className='text-2xl -mt-8 font-normal text-center text-gray-800 dark:text-gray-100'>
                Instant money transfer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <InputField
                  label='Reciever A/C'
                  rest={hookform.register('receiverAccNum')}
                  placeholder='Enter reciever account number'
                  error={hookform.errors?.receiverAccNum?.message}
                  mandatory
                />
                <InputField
                  label='IFSC code number'
                  rest={hookform.register('ifscCodeNumber')}
                  placeholder='Enter IFSC code number'
                  error={hookform.errors?.ifscCodeNumber?.message}
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
                <DefaultButton
                  icon={dt.loading ? <RollLoader /> : <Send className='mr-2' size={18} />}
                  onClick={hookform.handleSubmit(dt.createTransaction)}
                  type='submit'
                  title={!dt.loading ? 'Transfer money' : 'Processing...'}
                  className='w-full text-center'
                  loading={dt.loading}
                />
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <SuccessModal
          open={dt.succesModalOpen}
          onOpenChange={() => dt.setSuccessModalOpen(false)}
          title='Transaction Successful!'
          description='Your transaction has been completed successfully.'
          details={[
            { label: 'Transaction ID', value: dt.data.transactionId },
            { label: 'Amount', value: `${dt.data.amt}/-` },
          ]}
        />
      </div>
    </LayoutWrapper>
  );
};

export default OneTimeTransfer;
