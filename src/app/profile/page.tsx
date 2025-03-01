import Profile from '@/components/Profile';
import Head from 'next/head';
import React, { Suspense } from 'react';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=1500'></meta>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    </>
  );
};

export default ProfilePage;
