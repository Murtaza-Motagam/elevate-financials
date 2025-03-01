import Login from '@/components/Authentication/Login/Index';
import React, { Suspense } from 'react';

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
