'use client';
import React from 'react';
import Image from 'next/image';
import { authenticationRoutes, publicRoutes } from '@/lib/routes';
import NextLink from '@/components/common/NextLink';
import useLogin from './hooks/useLogin';
import PasswordInput from '@/widgets/PasswordInput';
import InputField from '@/widgets/Input';
import DefaultButton from '@/widgets/DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';

const Login = () => {
  const { hookform, onSubmit, loading } = useLogin();
  return (
    <>
      <div className='flex flex-col md:flex-row h-screen w-full'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen p-6 md:p-10'>
          <div className='max-w-full md:max-w-sm w-full'>
            <h2 className='text-2xl md:text-3xl flex items-center gap-x-2 flex-wrap font-semibold'>
              Login to
              <NextLink
                className='text-primary hover:text-black dark:hover:text-white'
                href={publicRoutes.home}
              >
                Elevate Financials
              </NextLink>
            </h2>
            <p className='text-sm mb-8 mt-1'>Enter to get tons of rewards and cashbacks.</p>
            <form className='space-y-6' onSubmit={hookform.handleSubmit(onSubmit)}>
              <InputField
                label='Username/Crn-Number'
                rest={hookform.register('username')}
                placeholder='Enter your username or crn number'
                type='text'
                error={hookform.errors?.username?.message}
                mandatory
              />
              <PasswordInput
                rest={hookform.register('password')}
                label='Password'
                placeholder='Enter password'
                error={hookform.errors?.password?.message}
                mandatory
              />
              <DefaultButton
                icon={loading && <RollLoader />}
                type='submit'
                title={!loading ? 'Submit' : 'Please wait...'}
                className='text-center w-full rounded-[5px]'
                loading={loading}
                disabled={loading}
              />
            </form>
            {/* Forgot password link */}
            <p className='text-right my-2 dark:text-gray-400'>
              <NextLink
                href={authenticationRoutes.forgotPassword}
                className='text-sm text-primary hover:underline'
              >
                Forgot Password?
              </NextLink>
            </p>

            {/* Sign-up link */}
            <p className='text-center my-3 dark:text-gray-400'>
              Don&apos;t have an account yet?{' '}
              <NextLink
                href={authenticationRoutes.register}
                className='text-md text-primary hover:underline'
              >
                Register
              </NextLink>
            </p>

            {/* Help section */}
            <div className='mt-2 text-sm flex justify-center items-center gap-x-2 dark:text-gray-400'>
              <p>Need help logging in?</p>
              <NextLink
                href={publicRoutes.helpCenter}
                className='text-primary hover:underline'
              >
                Visit our Help Center
              </NextLink>
            </div>
          </div>
        </div>
        <div className='hidden md:block relative w-1/2'>
          <Image
            src='https://images.unsplash.com/photo-1691045118425-57e55304435e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Background'
            fill
            className='w-full'
          />
        </div>
      </div>
    </>
  );
};

export default Login;
