'use client';

import React, { SetStateAction } from 'react';
import { sidebarLinks } from '@/lib/constant';
import { getActiveClassSidebar } from '@/lib/common';
import { useRouter } from 'next/navigation';
import { protectedRoutes } from '@/lib/routes';

const ProfileSidebar = ({
  selectedTab,
  setSelectedTab = () => {},
  setLoading = () => {},
  handleClose = () => {},
  onSmallDv = false,
}: {
  selectedTab?: number;
  setSelectedTab?: React.Dispatch<SetStateAction<number>>;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
  onSmallDv?: boolean;
}) => {
  const router = useRouter();

  const handleTab = (tabIndex: number) => {
    handleClose();
    setSelectedTab(tabIndex);
    setLoading(false);
    router.push(`${protectedRoutes.profile}?tab=${tabIndex}`);
  };

  return (
    <div
      className={`${onSmallDv ? 'w-full' : '!max-w-[250px] border-r border-gray-300 dark:border-gray-800'} w-full md:fixed md:w-[240px] md:left-0 py-1`}
    >
      <div className={`${!onSmallDv && 'h-[73vh]'}`}>
        {sidebarLinks.map((category, categoryIndex) => (
          <div key={categoryIndex} className='w-full mt-5 pl-3'>
            <h1 className='text-xs text-gray-600 dark:text-gray-400'>{category.category}</h1>
            <div className='w-full links flex flex-col mt-2 space-y-1'>
              {category.links.map((link, linkIndex) => {
                // Calculate unique index for each link in the flat structure
                const tabIndex =
                  sidebarLinks
                    .slice(0, categoryIndex)
                    .reduce((acc, cur) => acc + cur.links.length, 0) + linkIndex;

                return (
                  <div
                    key={linkIndex}
                    onClick={() => handleTab(tabIndex)}
                    className={`flex text-sm items-center gap-x-1 p-2 mr-2 cursor-pointer text-black dark:text-gray-200 hover:bg-primary hover:text-white transition ease-out duration-500 rounded-[6px] ${getActiveClassSidebar(selectedTab, tabIndex)}`}
                  >
                    <link.icon size={16} />
                    <span>{link.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
