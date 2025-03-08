'use client';
import React, { useState } from 'react';
import useHeader from './hooks/useHeader';
import { authenticationRoutes, protectedRoutes, publicRoutes } from '@/lib/routes';
import { backendUrlPreview, navLinks } from '@/lib/constant';
import NextLink from '@/components/common/NextLink';
import { getActiveClass } from '@/lib/common';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Landmark, LogInIcon, Menu } from 'lucide-react';
import BasicLoader from '../Loaders/BasicLoader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TextToImage from '@/components/common/TextToImage';
import MobileHeader from './MobileHeader';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const { router, pathname, theme, states, logout } = useHeader();
  const [open, setOpen] = useState<boolean>(false);

  const { mainUser } = states;

  return (
    <header className='w-full flex items-center justify-between p-4 shadow-md sticky top-0 backdrop-blur-lg z-20'>
      <div
        onClick={() => router.push(publicRoutes.home)}
        className='logo cursor-pointer flex flex-col items-center gap-x-1'
      >
        <h2 className='text-lg md:text-xl font-bold text-primary dark:text-white flex items-start gap-x-2'>
          <LazyLoadImg
            src='/images/logo.png'
            alt='logo'
            className='md:w-14 md:h-14 w-10 h-10 object-contain border-2 border-gray-800 dark:border-2 dark:border-gray-200 rounded-full'
          />
          <p className='hidden md:mt-2 md:flex flex-col items-start justify-start'>
            <span className='md:text-xl'>Elevate <span className='text-tertiary dark:text-white'>Financials</span></span>
            <span className='text-xs text-gray-700 dark:text-gray-300'>Empowering your financial future.</span>
          </p>
        </h2>
      </div>
      <div className='hidden md:flex links items-center gap-x-4'>
        {navLinks.map((li) => {
          return (
            <NextLink
              key={li.redirectLink}
              href={li.redirectLink}
              className={getActiveClass(li.redirectLink, pathname, theme)}
            >
              {li.name}
            </NextLink>
          );
        })}
      </div>

      <div className='flex items-center gap-x-4'>

        <div
          className='sideNavigation flex items-center gap-x-2'
          suppressHydrationWarning
        >
          <span className='hidden md:block'><ModeToggle /></span>
          {states.contextLoading ? (
            <BasicLoader />
          ) : !states.isUser && !states.contextLoading ? (
            <Button
              onClick={() => router.push(authenticationRoutes.login)}
              className='rounded-full px-5 text-sm dark:text-white'
            >
              <LogInIcon />
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className=' rounded-full overflow-hidden cursor-pointer relative group'>
                  {mainUser?.profileImg ? (
                    <Avatar>
                      <AvatarImage src={`${backendUrlPreview}/${mainUser?.profileImg}`} />
                      <AvatarFallback>UR</AvatarFallback>
                    </Avatar>

                  ) : (
                    <TextToImage nameText={`${mainUser?.firstName} ${mainUser?.lastName}`} />
                  )}
                  <div className='absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full'></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56 mr-10'>
                <DropdownMenuLabel className='dark:text-gray-200'>My Account</DropdownMenuLabel>
                <p className='text-xs ml-2 dark:text-gray-400'>{mainUser?.email}</p>
                <DropdownMenuSeparator className='bg-gray-200 mb-3 dark:bg-gray-800 mt-2' />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className='cursor-pointer dark:text-gray-200 dark:hover:text-white'
                    onClick={() => router.push(protectedRoutes.profile)}
                  >
                    My Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem
                  className='text-red-500 hover:!text-red-500 cursor-pointer'
                  onClick={() => logout()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className='md:hidden flex items-center gap-x-1'>
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu size={35} className='hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md p-2' />
            </SheetTrigger>
            <SheetContent>
              <MobileHeader
                theme={theme}
                pathname={pathname}
                loading={states.contextLoading}
                isUser={states.isUser}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
