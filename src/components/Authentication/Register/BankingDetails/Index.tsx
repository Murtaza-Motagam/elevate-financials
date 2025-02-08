'use client'
import Details from '@/components/common/Details';
import TextToImage from '@/components/common/TextToImage';
import { backendUrl, backendUrlPreview, compNm, KEYS } from '@/lib/constant';
import { LocalStorage } from '@/lib/localStorage';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper'
import LazyLoadImg from '@/widgets/LazyLoadImg';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"
import { CircleCheck, CircleUser, Clipboard, ClipboardCheck, Copyright, HandCoins, Home, IndianRupee, Landmark, Mail, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { capitalizeFirstLetter, copyToClipboard } from '@/lib/common';
import DefaultButton from '@/widgets/DefaultButton';
import { useRouter } from 'next/navigation';
import { publicRoutes } from '@/lib/routes';

const BankingDetails = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [copy, setCopy] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>();
    const checkForModule = LocalStorage.getJSON(KEYS.authDetails);
    const url = `${backendUrl}/user/get-user`;
    const router = useRouter();

    const handleCopy = () => {

        if (user) {
            const copyAccDetails = `
            Email: ${user?.personalDetails?.email}
Username: ${user?.authentication?.username}
Account Number: ${user?.accountDetails?.accountNumber}
CRN Number: ${user?.accountDetails?.crnNumber}
IFSC Code: ${user?.accountDetails?.ifscCode}
Account Type: ${user?.accountDetails?.accountType}
Balance: ${user?.accountDetails?.balance}
`.trim(); // Trim removes unwanted spaces or newlines at the start/end

            copyToClipboard(copyAccDetails);
            setCopy(true);
        }
    }

    const getUser = async () => {
        setLoading(true)
        try {
            const response = await axios({
                url,
                method: 'get',
                headers: {
                    Authorization: checkForModule?.token
                }
            });
            const resData = response.data;
            setUser(resData?.details || '');
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <LayoutWrapper>
            <div className="w-full h-full p-5 md:!p-10">
                <div className="container w-full mx-auto px-5 py-10 border border-gray-400 dark:bg-transparent rounded-xl">
                    {loading ? (
                        <>
                            <div className="w-full items-start flex justify-center md:justify-between">
                                <div className="logo flex space-x-2 mb-10">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="flex flex-col space-y-2">
                                        <Skeleton className="h-5 w-[200px] md:w-[330px]" />
                                        <Skeleton className="h-5 w-[150px] md:w-[250px]" />
                                    </div>
                                </div>

                                <div className="hidden md:block copyright">
                                    <div className="flex items-center gap-x-2">
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                        <div className="flex flex-col items-start space-y-2">
                                            <Skeleton className="h-5 w-[170px]" />
                                            <Skeleton className="h-5 w-[100px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center space-y-3'>
                                <Skeleton className="w-14 h-14 rounded-full" />
                                <Skeleton className="h-5 w-[250px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                                <Skeleton className="h-5 p-6" />
                            </div>
                            <div className="w-full flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-end space-x-2">
                                <Skeleton className="h-10 w-full md:w-[150px]" />
                                <Skeleton className="h-10 w-full md:w-[150px]" />
                            </div>
                            <div className="w-full mx-auto mt-6 p-4 flex flex-col space-y-3 justify-center items-center">
                                <Skeleton className="h-5 w-[200px] md:w-[850px]" />
                                <Skeleton className="h-5 w-[150px] md:w-[650px]" />
                                <Skeleton className="h-5 w-[100px] md:w-[550px]" />
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className="w-full flex-col md:flex md:flex-row space-y-5 md:space-y-0 justify-center mb-10 md:mb-5 items-start md:justify-between">
                                <div className="logo flex flex-col">
                                    <h1 className='text-primary dark:text-white uppercase text-xl md:text-2xl font-extrabold flex items-center gap-x-2'>
                                        <Landmark />
                                        <span>{compNm}</span>
                                    </h1>
                                    <p className='text-xs ml-8'>Empowering Your Financial Future.</p>
                                </div>

                                <div className="text-xl md:text-2xl font-semibold border-b pb-2 border-gray-800 dark:border-gray-300">Account Overview</div>

                                <div className="hidden md:block copyright">
                                    <div className="flex items-center gap-x-2">
                                        <Copyright className='text-primary' />
                                        <p className="text-xs"><span className='font-bold'>Copyright</span> {compNm} 2020, <br />All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="name flex flex-col items-center space-y-3">
                                {user?.documentDetails?.profileImg ? (
                                    <LazyLoadImg
                                        src={`${backendUrlPreview}/${user?.documentDetails?.profileImg}`}
                                        className='w-14 h-14 object-contain border-2 border-gray-800 dark:border-2 dark:border-gray-200 rounded-full'
                                    />
                                ) : (
                                    <TextToImage nameText={`${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName}`} className='rounded-full text-lg w-14 h-14 shadow-md shadow-gray-500' />
                                )}

                                <h1 className="text-lg font-semibold text-gray-700 dark:text-white">{`${user?.personalDetails?.firstName || ''} ${user?.personalDetails?.lastName || ''}`}</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
                                <Details title='Email:' icon={<Mail size={15} className='text-primary' />} text={user?.personalDetails?.email} />
                                <Details title='Username' icon={<User size={15} className='text-primary' />} text={user?.authentication?.username} />
                                <Details title='Account Number' icon={<CircleUser size={15} className='text-primary' />} text={user?.accountDetails?.accountNumber} />
                                <Details title='CRN Number' icon={<CircleUser size={15} className='text-primary' />} text={user?.accountDetails?.crnNumber} />
                                <Details title='IFSC Code' icon={<CircleUser size={15} className='text-primary' />} text={user?.accountDetails?.ifscCode} />
                                <Details title='Account Type' icon={<HandCoins size={15} className='text-primary' />} text={user?.accountDetails?.accountType} />
                                <Details title='Balance' icon={<IndianRupee size={15} className='text-primary' />} text={`${user?.accountDetails?.balance}/-`} />
                                <Details title='Account Status' icon={<CircleCheck size={15} className='text-primary' />} innerClass='text-green-500 !font-extrabold  uppercase' text={capitalizeFirstLetter(user?.status)} />

                            </div>
                            <div className="w-full flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-end space-x-2">
                                <DefaultButton onClick={handleCopy} icon={copy ? <ClipboardCheck /> : <Clipboard />} title={copy ? 'Copied' : 'Copy Details'} className='text-xs w-full md:w-fit' />
                                <DefaultButton variant='outline' onClick={() => router.push(publicRoutes.home)} icon={<Home />} title='Go to Home' className='w-full md:w-fit text-xs' />
                            </div>
                            <div className="footer-container mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                    Need Help? Contact us at <span className="text-primary cursor-pointer hover:underline">support@elevatefinancials.com</span> or call us at <span className="text-primary hover:underline cursor-pointer">1-800-123-4567</span>.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
                                    This information is provided for your reference. Please review your account details carefully. If you notice any discrepancies, contact our support team immediately.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                                    Your account information is encrypted and secure. For added safety, avoid sharing your login credentials with anyone.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </LayoutWrapper>
    )
}

export default BankingDetails
