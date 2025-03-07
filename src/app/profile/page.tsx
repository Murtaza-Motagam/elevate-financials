import Profile from '@/components/Profile';
import PageLoader from '@/shared/Loaders/PageLoader';
import Head from 'next/head';
import React, { Suspense } from 'react';

const ProfilePage = async () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=1500'></meta>
      </Head>
      <Suspense
        fallback={
          <div className='w-full flex items-center justify-center h-screen'>
            <PageLoader />
          </div>
        }>
        <Profile />
      </Suspense>
    </>
  );
};

export default ProfilePage;
