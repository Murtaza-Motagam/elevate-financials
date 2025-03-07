import Login from '@/components/Authentication/Login';
import PageLoader from '@/shared/Loaders/PageLoader';
import React, { Suspense } from 'react';

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className='w-full flex items-center justify-center h-screen'>
          <PageLoader />
        </div>
      }
    >
      <Login />
    </Suspense>
  );
};

export default LoginPage;
