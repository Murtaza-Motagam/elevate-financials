'use client';
import TextToImage from '@/components/common/TextToImage';
import { Button } from '@/components/ui/button';
import { dateTimeDisplay, formatWithCommas, getUserInfo } from '@/lib/common';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  CircleCheckBig,
  CircleUser,
  EditIcon,
  Hash,
  Landmark,
  ShieldCheck,
  Download,
  QrCode,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProfileImage from './Modals/ProfileImage';
import EditProfile from './Modals/EditProfile';
import AccountTabs from './AccountTabs';
import PageLoader from '@/shared/Loaders/PageLoader';
import { Tooltip } from 'react-tooltip';
import ProfileQr from './Modals/ProfileQr';
import useProfile from './hooks/useProfile';

const checkForAccStatus = (accStatus: string) => {
  if (accStatus === 'active') {
    return <span className='flex items-center gap-x-2 text-green-500 font-semibold'>Active</span>;
  }
  return <span className='flex items-center gap-x-2 text-red-500 font-semibold'>Not Active</span>;
};

const MyAccounts = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userInfo, setUserInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const { qrOpen, setQrOpen, handleQrGenerator, ...profileData } = useProfile();

  const fetchUserInfo = async () => {
    try {
      const userData = await getUserInfo();
      setUserInfo(userData?.details);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const accInfo = {
    balance: userInfo?.accountDetails?.balance,
    accNumber: userInfo?.accountDetails?.accountNumber,
  };

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center h-screen'>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className='w-full overflow-y-scroll mx-4 pr-4'>
      {/* Account Overview */}
      <Card className='bg-gradient-to-r from-primary to-bg-primary-70 shadow-md shadow-gray-500 text-white p-6 rounded-lg'>
        <CardContent className='flex md:justify-between justify-center flex-col md:flex-row items-center'>
          <div>
            <p className='text-lg'>Current balance</p>
            <h2 className='text-3xl font-bold'>
              ${formatWithCommas(userInfo?.accountDetails?.balance)}
            </h2>
            <p className='text-sm mt-1'>
              Account N/O •{' '}
              <span className='italic'>{userInfo?.accountDetails?.accountNumber}</span>
            </p>
          </div>
          <Button className='dark:bg-white text-white dark:text-primary dark:hover:bg-transparent dark:hover:border dark:hover:border-white dark:hover:text-white mt-6'>
            View statements <Download className='ml-2 h-4 w-4' />
          </Button>
        </CardContent>
      </Card>
      <div className='border-b border-gray-400 pb-3 mt-5 font-bold flex items-center justify-between text-xl text-gray-800 dark:text-white'>
        <span>Profile details</span>
        <div className='flex gap-x-2'>
          <Button
            data-tooltip-content='Create profile QR'
            data-tooltip-id='qr'
            variant='outline'
            onClick={handleQrGenerator}
            className='hover:bg-primary hover:text-white rounded-full p-2'
          >
            <QrCode />
            <Tooltip id='qr' />
          </Button>
          <Button
            data-tooltip-content='Edit profile'
            data-tooltip-id='editProfile'
            variant='outline'
            onClick={() => setEditProfile(true)}
            className='hover:bg-primary hover:text-white rounded-full p-2'
          >
            <EditIcon />
            <Tooltip id='editProfile' />
          </Button>
        </div>
      </div>

      <div className='mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8'>
        {/* Profile Image */}
        <div className='relative w-36 h-36 rounded-full shadow-md overflow-hidden border-2 border-gray-300 dark:border-gray-700'>
          {userInfo?.documentDetails?.profileImg ? (
            <LazyLoadImg
              src={userInfo?.documentDetails?.profileImg}
              className='w-full h-full object-cover'
            />
          ) : (
            <TextToImage
              nameText={`${userInfo?.personalDetails?.firstName} ${userInfo?.personalDetails?.lastName}`}
              className='text-lg w-full h-full'
            />
          )}
          {userInfo?.documentDetails?.profileImg && (
            <button
              className='absolute inset-0 hover:bg-gray-600 bg-opacity-40 hover:bg-opacity-60 flex items-center justify-center transition-opacity'
              aria-label='View Profile Image'
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        {/* Profile Details */}
        <div className='flex-1 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[
              {
                label: 'Full name',
                value: `${userInfo?.personalDetails?.firstName || '-'} ${userInfo?.personalDetails?.lastName || '-'}`,
                icon: <CircleUser />,
              },
              {
                label: 'Username',
                value: userInfo?.authentication?.username || '-',
                icon: <Hash />,
              },
              {
                label: 'Account type',
                value: userInfo?.accountDetails?.accountType || '-',
                icon: <Landmark />,
              },
              {
                label: 'Email',
                value: userInfo?.personalDetails?.email || '-',
                icon: <ShieldCheck />,
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className='flex items-center space-x-3'>
                <span className='text-primary dark:text-white'>{icon}</span>
                <div>
                  <h2 className='text-sm font-medium text-gray-500'>{label}:</h2>
                  <p className='text-lg font-semibold dark:text-gray-100'>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banking Details */}
      <div className='w-full mt-8 mb-4'>
        <h1 className='border-b border-gray-400 pb-3 font-bold text-xl text-gray-800 dark:text-white'>
          Banking details
        </h1>

        <div className='w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[
            {
              label: 'Account number',
              value: userInfo?.accountDetails?.accountNumber || '-',
              icon: <Hash />,
            },
            {
              label: 'CRN number',
              value: userInfo?.accountDetails?.crnNumber || '-',
              icon: <Landmark />,
            },
            {
              label: 'IFSC code',
              value: userInfo?.accountDetails?.ifscCode || '-',
              icon: <ShieldCheck />,
            },
            {
              label: 'Account status',
              value: checkForAccStatus(userInfo?.status),
              icon: <CircleCheckBig />,
            },
            {
              label: 'Created on',
              value: dateTimeDisplay(userInfo?.accountDetails?.createdAt) || '-',
              icon: <Calendar />,
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className='p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm flex items-center space-x-3'
            >
              <span className='text-primary dark:text-white'>{icon}</span>
              <div>
                <p className='text-gray-600 dark:text-gray-400 font-medium'>{label}:</p>
                <span className='font-bold text-gray-800 dark:text-gray-100'>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AccountTabs accInfo={accInfo} />

      {/* Modals */}
      {/* Profile Image modal */}
      <ProfileImage userInfo={userInfo} open={open} setOpen={setOpen} />
      <ProfileQr profileData={profileData} open={qrOpen} setOpen={setQrOpen} />
      <EditProfile open={editProfile} setOpen={setEditProfile} fetchUserInfo={fetchUserInfo} />
    </div>
  );
};

export default MyAccounts;
