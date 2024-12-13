'use client'
import React from 'react';
import Image from 'next/image';
// import useLogin from './hooks/useLogin';
import { authenticationRoutes, publicRoutes } from '@/lib/routes';
import NextLink from '@/components/common/NextLink';
import GoogleLogo from '@/icons/GoogleLogo'
import useLogin from './hooks/useLogin';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/widgets/PasswordInput';
import { ReloadIcon } from '@radix-ui/react-icons';
import InputField from '@/widgets/Input';
import LoginImg from '@/assets/loginImg.jpg';

const Login = () => {
  const { hookform, onSubmit, loading } = useLogin();
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen p-6 md:p-10">
          <div className="max-w-sm w-full">
            <h2 className="text-2xl md:text-3xl flex items-center gap-x-2 flex-wrap font-semibold">Login to
              <span className='text-primary'> Elevate Financials</span>
            </h2>
            <p className="text-sm mb-8">Enter to get tons of rewards and cashbacks.</p>
            <form className="space-y-6" onSubmit={hookform.handleSubmit(onSubmit)}>
              <InputField
                label='CRN Number'
                rest={hookform.register('crnNumber')}
                placeholder='Enter your CRN'
                type='number'
                error={hookform.errors?.crnNumber?.message}
                mandatory
              />
              <PasswordInput
                rest={hookform.register('password')}
                label='Password'
                placeholder='Enter password'
                error={hookform.errors?.password?.message}
              />
              <Button
                type='submit'
                className='w-full rounded-sm dark:text-white'
              >
                {loading ?
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> :
                  <LogIn size={24} />
                }
                {loading ? '' : 'Login'}
              </Button>
            </form>
            <div className="my-6 w-full flex items-center justify-center gap-x-2 text-center dark:text-gray-400">
              <span>Or visit </span>
              <NextLink title='Home' className='text-primary hover:underline !px-0 !py-0' href={publicRoutes.home} />
            </div>
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md gap-x-2 dark:text-gray-200">
              <GoogleLogo />
              Login with Google
            </button>
            <p className="text-center mt-6 dark:text-gray-400">
              Don&apos;t have an account yet? <NextLink href={authenticationRoutes.register} title='Register' className="text-md text-primary hover:underline" />
            </p>
          </div>
        </div>
        <div className="hidden md:block relative w-1/2">
          <Image
            src={LoginImg}
            alt="Background"
            className='w-full'
          // fill
          />
        </div>
      </div>
    </>
  );
};

export default Login;