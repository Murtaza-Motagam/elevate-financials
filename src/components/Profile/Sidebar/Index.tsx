'use client';

import React, { SetStateAction, useEffect, useState } from 'react';
import { backendUrl, backendUrlPreview, sidebarLinks } from '@/lib/constant';
import { getActiveClassSidebar } from '@/lib/common';
import { useRouter } from 'next/navigation';
import { protectedRoutes } from '@/lib/routes';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import axios from 'axios';
import { LocalStorage } from '@/lib/localStorage';
import TextToImage from '@/components/common/TextToImage';
import { Ellipsis } from 'lucide-react';
import SettingModal from './Modals/SettingModal';
import { useUser } from '@/context/UserContext';

const ProfileSidebar = ({
  selectedTab,
  setSelectedTab = () => { },
  setLoading = () => { },
  handleClose = () => { },
  onSmallDv = false,
}: {
  selectedTab?: number;
  setSelectedTab?: React.Dispatch<SetStateAction<number>>;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
  onSmallDv?: boolean;
}) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const [userLoad, setUserLoad] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const { mainUser, contextLoading } = useUser();

  const handleTab = (tabIndex: number) => {
    handleClose();
    setSelectedTab(tabIndex);
    setLoading(false);
    router.push(`${protectedRoutes.profile}?tab=${tabIndex}`);
  };

  const getUserInfo = async () => {
    setUserLoad(true);
    setUser(mainUser || '');
    setUserLoad(false);
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainUser, contextLoading]);

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
      {!userLoad && (
        <div
          className={`w-full flex items-start justify-start ${onSmallDv ? 'mt-20' : 'mt-5'} gap-x-3 border-t pl-2 pb-5 border-gray-500 pt-2 overflow-hidden`}
        >
          {user?.profileImg ? (
            <LazyLoadImg
              src={`${backendUrlPreview}/${user?.profileImg}`}
              className='w-10 h-10 object-contain rounded-full mt-1 border-2 border-gray-800 dark:border-white'
            />
          ) : (
            <TextToImage
              nameText={user?.name}
              className='rounded-full text-lg mt-1 w-10 h-10 border-2 border-gray-800 dark:border-white'
            />
          )}
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <h1 className='text-sm text-black dark:text-gray-200'>
                {user?.name?.length <= 20 ? user?.name : `${user?.name?.substring(0, 20)}...`}
              </h1>
              <Ellipsis
                onClick={() => setOpen(true)}
                className='rounded-full p-2 hover:bg-primary hover:text-white cursor-pointer'
                size={30}
              />
            </div>
            <p className='text-[12px] text-gray-600 dark:text-gray-400 truncate overflow-hidden text-ellipsis whitespace-nowrap'>
              {user?.email}
            </p>
          </div>
        </div>
      )}

      <SettingModal user={user} open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProfileSidebar;
