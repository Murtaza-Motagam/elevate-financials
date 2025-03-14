import NextLink from '@/components/common/NextLink';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { navLinks } from '@/lib/constant';
import { getActiveClassMobile } from '@/lib/common';
import React from 'react';
import BasicLoader from '../Loaders/BasicLoader';
import { useRouter } from 'next/navigation';
import { authenticationRoutes, protectedRoutes } from '@/lib/routes';
import { LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TextToImage from '@/components/common/TextToImage';

interface MobileHeaderProps {
  theme?: string | undefined;
  loading: boolean;
  isUser: boolean | undefined;
  pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ theme, pathname, loading, isUser, user }) => {
  const router = useRouter();

  return (
    <>
      <SheetHeader>
        <SheetTitle className='text-primary text-left dark:text-white uppercase'>
          Elevate <span className='text-tertiary dark:text-white'>Financials</span>
        </SheetTitle>
        <SheetDescription className='text-left'>
          Elevate your financial growth for your secure future.
        </SheetDescription>

        <div className='w-full !mt-7 flex flex-col gap-y-5 text-center'>
          {loading ? (
            <BasicLoader />
          ) : !isUser && !loading ? (
            <Button
              onClick={() => router.push(authenticationRoutes.login)}
              className='w-full px-5 text-sm dark:text-white'
            >
              <LogInIcon />
              Login
            </Button>
          ) : (
            <NextLink
              href={protectedRoutes.profile}
              className={`${getActiveClassMobile(protectedRoutes.profile, pathname, theme)} flex items-center justify-center gap-x-2`}
            >
              {user?.profileImg ? (
                <Avatar>
                  <AvatarImage src={user?.profileImg} />
                  <AvatarFallback>UR</AvatarFallback>
                </Avatar>
              ) : (
                <TextToImage
                  className='rounded-full'
                  nameText={`${user?.firstName} ${user?.lastName}`}
                />
              )}
              My profile
            </NextLink>
          )}
        </div>
        <div className='w-full !mt-7 flex flex-col gap-y-5 text-center'>
          {navLinks.map((li) => {
            return (
              <NextLink
                key={li.redirectLink}
                href={li.redirectLink}
                className={getActiveClassMobile(li.redirectLink, pathname, theme)}
              >
                {li.name}
              </NextLink>
            );
          })}
        </div>
      </SheetHeader>
    </>
  );
};

export default MobileHeader;
