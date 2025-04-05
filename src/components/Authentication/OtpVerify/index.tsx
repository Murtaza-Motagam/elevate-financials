'use client';
import React from 'react';
import Image from 'next/image';
import OtpInput from 'react-otp-input';
import useOtpVerify from './hooks/useOtpVerify';
import PageLoader from '@/shared/Loaders/PageLoader';

const OtpVerify = () => {
  const { otp, setOtp, loading } = useOtpVerify();

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center h-screen'>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className='flex h-screen w-full'>
      {/* Left Section */}
      <div className='flex flex-col justify-center w-full md:w-1/2 px-6 md:px-16 py-10 text-center'>
        <div className='max-w-md mx-auto'>
          <Image
            src='/images/logo.png'
            height={90}
            width={90}
            alt='logo'
            className='my-5 mx-auto'
          />
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Secure your access
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-6'>
            For your security, we’ve sent a 6-digit verification code to your registered mobile
            number. Please enter the code below to continue to your secure banking dashboard.
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className='mx-1' />}
            renderInput={(props) => (
              <input
                {...props}
                className='!w-10 !h-10 md:!w-14 md:!h-14 rounded-[3px] border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center text-xl font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all'
              />
            )}
            containerStyle='flex justify-between mb-6'
          />

          <p className='text-sm text-gray-500 dark:text-gray-300 mt-6 text-center'>
            Didn’t receive the code?{' '}
            <button className='text-primary hover:underline'>Resend OTP</button>
          </p>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className='hidden md:block relative w-1/2'>
        <Image
          src='https://images.unsplash.com/photo-1691045118425-57e55304435e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Background'
          fill
          className='w-full'
        />
      </div>
    </div>
  );
};

export default OtpVerify;
