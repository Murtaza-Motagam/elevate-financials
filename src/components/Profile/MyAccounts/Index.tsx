'use client';
import TextToImage from '@/components/common/TextToImage';
import { getUserInfo } from '@/lib/common'
import { backendUrlPreview } from '@/lib/constant';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import React, { useEffect, useState } from 'react'

const MyAccounts = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await getUserInfo();
            setUserInfo(userData?.details);
        };

        fetchUserInfo();
    }, []);

    console.log(userInfo);
    return (
        <div className="w-full mx-4 pr-4">
            <h1 className='border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl uppercase'>Account Overview</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center">
                <div className="mt-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start p-4">
                    {/* Profile Section */}
                    <div className="flex-shrink-0 w-44 h-44 rounded-lg overflow-hidden bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center">
                        {userInfo?.documentDetails?.profileImg ? (
                            <LazyLoadImg
                                src={`${backendUrlPreview}/${userInfo?.documentDetails?.profileImg}`}
                                className="w-full h-full object-cover"
                                alt="Profile"
                            />
                        ) : (
                            <TextToImage
                                nameText={`${userInfo?.personalDetails?.firstName} ${userInfo?.personalDetails?.lastName}`}
                                className="text-4xl font-bold text-white"
                            />
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 w-full mt-4 md:mt-0 md:ml-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile Details</h2>
                        <div className="grid grid-cols-1 gap-3 text-sm md:text-base">
                            <div className="flex items-center gap-x-2">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Full Name:</span>
                                <span className="text-gray-800 dark:text-gray-100 font-semibold">Roman Reigns</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">Hello</div>
            </div>
        </div>
    )
}

export default MyAccounts
