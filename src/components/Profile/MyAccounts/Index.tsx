'use client';
import TextToImage from '@/components/common/TextToImage';
import { Button } from '@/components/ui/button';
import { dateTimeDisplay, formatWithCommas, getUserInfo } from '@/lib/common'
import { backendUrlPreview } from '@/lib/constant';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { Calendar, CircleCheck, CircleCheckBig, CircleUser, CircleX, EditIcon, IndianRupee } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ProfileImage from './Modals/ProfileImage';
import RollLoader from '@/shared/Loaders/RollLoader';
import DefaultButton from '@/widgets/DefaultButton';

const checkForAccStatus = (accStatus: string) => {
    if (accStatus) {
        if (accStatus === 'active') {
            return (
                <span className="flex items-center gap-x-2 font-bold">
                    <CircleCheckBig className='text-[#198754]' />
                    Active
                </span>
            )
        } else {
            return (
                <span className="flex items-center gap-x-2 font-bold">
                    <CircleX className='text-red-600' />
                    Not Active
                </span>
            )
        }
    } else {
        return ''
    }
}

const MyAccounts = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userInfo, setUserInfo] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [balanceLoader, setBalanceLoader] = useState<boolean>(false);
    const [userBalance, setUserBalance] = useState(null);

    const ShowBalance = () => {
        setBalanceLoader(true);
        setTimeout(() => {
            setUserBalance(userInfo?.accountDetails?.balance || "N/A");
            setBalanceLoader(false);
        }, 2000);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await getUserInfo();
            setUserInfo(userData?.details);
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="w-full mx-4 pr-4">
            <h1 className="border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl">
                Account Overview
            </h1>
            <div className="mt-6 bg-[#EFEFEF] dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Image */}
                <div className="relative w-32 h-32 rounded-full shadow-md shadow-gray-400 overflow-hidden">
                    {userInfo?.documentDetails?.profileImg ? (
                        <LazyLoadImg
                            src={`${backendUrlPreview}/${userInfo?.documentDetails?.profileImg}`}
                            className='w-full h-full object-contain'
                        />
                    ) : (
                        <TextToImage nameText={`${userInfo?.personalDetails?.firstName} ${userInfo?.personalDetails?.lastName}`} className='text-lg w-full h-full' />
                    )}
                    {userInfo?.documentDetails?.profileImg && (
                        <div className="absolute inset-0 hover:bg-gray-200 hover:bg-opacity-60 flex items-center justify-center group-hover:opacity-50 transition-opacity pointer-events-none">
                            <button
                                className="w-full h-full flex items-center justify-center pointer-events-auto"
                                aria-label="View Profile Image"
                                onClick={() => setOpen(true)} // Trigger modal on click
                            >
                            </button>
                        </div>
                    )}

                </div>

                {/* Profile Details */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-sm font-medium text-gray-500">Full Name: </h2>
                            <p className="text-lg font-semibold dark:text-gray-50">{`${userInfo?.personalDetails?.firstName || '-'} ${userInfo?.personalDetails?.lastName || '-'}`}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-gray-500">Username: </h2>
                            <p className="text-lg font-semibold dark:text-gray-50">{userInfo?.authentication?.username || '-'}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-gray-500">Account Type: </h2>
                            <p className="text-lg font-semibold dark:text-gray-50">{userInfo?.accountDetails?.accountType || '-'}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-gray-500">Email: </h2>
                            <p className="text-lg font-semibold dark:text-gray-50">{userInfo?.personalDetails?.email || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className='w-full md:w-fit'>
                    <div className="hidden md:block">
                        <Button variant='outline' className='hover:bg-primary hover:text-white rounded-full p-2'>
                            <EditIcon />
                        </Button>
                    </div>
                    <div className="my-2 md:hidden">
                        <Button variant='outline' className='!w-full hover:bg-primary hover:text-white p-2'>
                            <EditIcon />
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full mx-4 mt-8 pr-4">
                <h1 className="border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl">
                    Banking Details
                </h1>

                <div className="w-full p-2 mt-3 md:mt-0 md:p-6 shadow-md rounded-lg">
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Account Number */}
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium flex items-center gap-x-2 text-gray-600 dark:text-gray-400">
                                <CircleUser size={20} className='text-primary' />
                                Account Number:
                            </p>
                            <span className="font-bold">{userInfo?.accountDetails?.accountNumber || '-'}</span>
                        </div>

                        {/* CRN Number */}
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium flex items-center gap-x-2 text-gray-600 dark:text-gray-400">
                                <CircleUser size={20} className='text-primary' />
                                CRN Number:
                            </p>
                            <span className="font-bold">{userInfo?.accountDetails?.crnNumber || '-'}</span>
                        </div>

                        {/* IFSC Code */}
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium flex items-center gap-x-2 text-gray-600 dark:text-gray-400">
                                <CircleUser size={20} className='text-primary' />
                                IFSC Code:
                            </p>
                            <span className="font-bold">{userInfo?.accountDetails?.ifscCode || '-'}</span>
                        </div>

                        {/* Account Status */}
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium flex items-center gap-x-2 text-gray-600 dark:text-gray-400">
                                <CircleCheck size={20} className='text-primary' />
                                Account Status:
                            </p>
                            {checkForAccStatus(userInfo?.status)}
                        </div>

                        {/* Account Created Date */}
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                            <p className="font-medium flex items-center gap-x-2 text-gray-600 dark:text-gray-400">
                                <Calendar size={20} className='text-primary' />
                                Created On:
                            </p>
                            <span className="font-bold">{dateTimeDisplay(userInfo?.accountDetails?.createdAt) || '-'}</span>
                        </div>

                    </div>

                    {/* Show Balance Button */}
                    <div className="mt-6 flex justify-end">
                        <DefaultButton
                            icon={
                                balanceLoader ? <RollLoader /> : <IndianRupee />
                            }
                            title={
                                balanceLoader
                                    ? "Please wait..."
                                    : userBalance !== null
                                        ? `${formatWithCommas(userBalance)}`
                                        : "Show Balance"
                            }
                            className={`text-center ${userBalance !== null && 'text-lg'}`}
                            onClick={ShowBalance}
                            loading={balanceLoader}
                        />
                    </div>
                </div>
            </div>

            {/* Profile Image modal */}
            <ProfileImage
                userInfo={userInfo}
                open={open}
                setOpen={setOpen}
            />
        </div >
    )
}

export default MyAccounts
