'use client';

import React, { SetStateAction, useEffect, useState } from 'react';
import { backendUrl, backendUrlPreview, sidebarLinks } from '@/lib/constant';
import { getActiveClassSidebar } from '@/lib/common';
import { useRouter } from 'next/navigation';
import { protectedRoutes } from '@/lib/routes';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import axios from 'axios';
import { LocalStorage } from '@/lib/localStorage';

const ProfileSidebar = ({
  selectedTab,
  setSelectedTab = () => { },
  setLoading = () => { },
}: {
  selectedTab?: number;
  setSelectedTab?: React.Dispatch<SetStateAction<number>>;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
}) => {

  const router = useRouter();
  const url = `${backendUrl}/user/get-user`;
  const checkForModule = LocalStorage.getJSON('authDetails');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({})
  const [userLoad, setUserLoad] = useState<boolean>(true)

  const handleTab = (tabIndex: number) => {
    router.push(`${protectedRoutes.profile}?tab=${tabIndex}`)
    setSelectedTab(tabIndex);
    setLoading(false);
  }

  const getUserInfo = async () => {
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
      console.error(error);
    } finally {
      setUserLoad(false)
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  return (
    <div className="max-w-[250px] sticky left-0 py-1 border-r dark:border-gray-200">
      {sidebarLinks.map((category, categoryIndex) => (
        <div key={categoryIndex} className="w-full mt-5 pl-3">
          <h1 className="text-xs text-gray-400 dark:text-gray-400">
            {category.category}
          </h1>
          <div className="w-full links flex flex-col mt-2 space-y-1">
            {category.links.map((link, linkIndex) => {
              // Calculate unique index for each link in the flat structure
              const tabIndex = sidebarLinks
                .slice(0, categoryIndex)
                .reduce((acc, cur) => acc + cur.links.length, 0) + linkIndex;

              return (
                <div
                  key={linkIndex}
                  onClick={() => handleTab(tabIndex)}
                  className={`flex text-sm items-center gap-x-1 p-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition ease-out duration-500 rounded-[6px] ${getActiveClassSidebar(selectedTab, tabIndex)}`}
                >
                  <link.icon size={16} />
                  <span>{link.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {!userLoad && (
        <div className="w-full flex items-start justify-start mt-5 gap-x-3 border-t pl-2 border-gray-500 pt-2">
          <LazyLoadImg src={`${backendUrlPreview}/${user?.documentDetails?.profileImg}`} className='w-10 h-10 object-contain rounded-full border-2 border-gray-800 dark:border-white'/>
          <div className="flex flex-col">
            <h1 className="text-sm text-black dark:text-gray-200">{`${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName}`}</h1>
            <p className="text-[12px] text-gray-600 dark:text-gray-400">{user?.personalDetails?.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
