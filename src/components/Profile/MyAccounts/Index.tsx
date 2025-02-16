'use client';
import TextToImage from '@/components/common/TextToImage';
import { Button } from '@/components/ui/button';
import { dateTimeDisplay, formatWithCommas, getUserInfo } from '@/lib/common';
import { backendUrlPreview } from '@/lib/constant';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  CircleCheckBig,
  CircleUser,
  CircleX,
  EditIcon,
  IndianRupee,
  Hash,
  Landmark,
  ShieldCheck,
  Download,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProfileImage from './Modals/ProfileImage';
import EditProfile from './Modals/EditProfile';
import AccountTabs from './AccountTabs';

const checkForAccStatus = (accStatus: string) => {
  if (accStatus === 'active') {
    return (
      <span className='flex items-center gap-x-2 text-green-500 font-semibold'>
        Active
      </span>
    );
  }
  return (
    <span className='flex items-center gap-x-2 text-red-500 font-semibold'>
      Not Active
    </span>
  );
};

const MyAccounts = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const fetchUserInfo = async () => {
    const userData = await getUserInfo();
    setUserInfo(userData?.details);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const accInfo = {
    balance: userInfo?.accountDetails?.balance,
    accNumber: userInfo?.accountDetails?.accountNumber
  }

  return (
    <div className='w-full overflow-y-scroll mx-4 pr-4'>
      {/* Account Overview */}
      <Card className="bg-primary text-white p-6 rounded-2xl shadow-lg">
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-lg">Account Balance</p>
            <h2 className="text-3xl font-bold">${formatWithCommas(userInfo?.accountDetails?.balance)}</h2>
            <p className="text-sm mt-1">Account N/O • <span className='italic'>{userInfo?.accountDetails?.accountNumber}</span></p>
          </div>
          <Button className="bg-white text-primary hover:bg-transparent hover:border hover:border-white hover:text-white mt-6">
            View statements <Download className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <div className='border-b border-gray-400 pb-3 mt-5 font-bold flex items-center justify-between text-xl text-gray-800 dark:text-white'>
        <span>Profile Details</span>
        <Button
          variant='outline'
          onClick={() => setEditProfile(true)}
          className='hover:bg-primary hover:text-white rounded-full p-2'
        >
          <EditIcon />
        </Button>
      </div>

      <div className='mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8'>
        {/* Profile Image */}
        <div className='relative w-36 h-36 rounded-full shadow-md overflow-hidden border-2 border-gray-300 dark:border-gray-700'>
          {userInfo?.documentDetails?.profileImg ? (
            <LazyLoadImg
              src={`${backendUrlPreview}/${userInfo?.documentDetails?.profileImg}`}
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
              className='absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-60 flex items-center justify-center transition-opacity'
              aria-label='View Profile Image'
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        {/* Profile Details */}
        <div className='flex-1 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[
              { label: 'Full name', value: `${userInfo?.personalDetails?.firstName || '-'} ${userInfo?.personalDetails?.lastName || '-'}`, icon: <CircleUser /> },
              { label: 'Username', value: userInfo?.authentication?.username || '-', icon: <Hash /> },
              { label: 'Account type', value: userInfo?.accountDetails?.accountType || '-', icon: <Landmark /> },
              { label: 'Email', value: userInfo?.personalDetails?.email || '-', icon: <ShieldCheck /> },
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
          Banking Details
        </h1>

        <div className='w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[
            { label: 'Account Number', value: userInfo?.accountDetails?.accountNumber || '-', icon: <Hash /> },
            { label: 'CRN Number', value: userInfo?.accountDetails?.crnNumber || '-', icon: <Landmark /> },
            { label: 'IFSC Code', value: userInfo?.accountDetails?.ifscCode || '-', icon: <ShieldCheck /> },
            { label: 'Account Status', value: checkForAccStatus(userInfo?.status), icon: <CircleCheckBig /> },
            { label: 'Created On', value: dateTimeDisplay(userInfo?.accountDetails?.createdAt) || '-', icon: <Calendar /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className='p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm flex items-center space-x-3'>
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
      <EditProfile open={editProfile} setOpen={setEditProfile} fetchUserInfo={fetchUserInfo} />
    </div >
  );
};

export default MyAccounts;
