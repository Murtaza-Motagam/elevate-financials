'use client';
import React from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import { QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputField from '@/widgets/Input';

const QrPay = () => {
  return (
    <LayoutWrapper>
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
            <QrCode size={110} className='mb-5 mx-auto' />
            <h2 className='text-3xl font-extrabold tracking-wide'>
              Generate QR Payment – Fast. Simple. Secure.
            </h2>

            {/* Description */}
            <p className='mt-3 text-lg text-gray-200 max-w-md mx-auto'>
              Make payments on the go with just a scan!
            </p>
            <p className='mt-10 text-lg font-semibold text-gray-200 text-left'>
              Our Scan & Pay feature enables you to:
            </p>
            <div className='flex flex-col text-left gap-y-3 mt-4'>
              <p className='text-base'>💳 Pay instantly at stores, vendors, and more.</p>
              <p className='text-base'>
                🔒 Experience secure transactions using encrypted QR codes.
              </p>
              <p className='text-base'>📱 Go cashless and cardless, just use your mobile phone.</p>
              <p className='text-base'>💼 Track and manage all payments in one place.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex items-start justify-center m-2'
        >
          <Card className='w-full md:max-w-xl py-2 md:p-6 shadow-none border-none rounded-none md:rounded-[6px]'>
            <CardHeader>
              <CardTitle className='text-2xl -mt-8 font-normal text-center text-gray-800 dark:text-gray-100'>
                Generate QR link to pay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <InputField
                  label='Amount'
                  type='number'
                  // rest={hookform.register('amt')}
                  placeholder='Type amount'
                  // error={hookform.errors?.amt?.message}
                  mandatory
                />
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </LayoutWrapper>
  );
};

export default QrPay;
