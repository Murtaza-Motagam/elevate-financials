'use client'
import React from 'react'
import useHeader from './hooks/useHeader'
import { authenticationRoutes, protectedRoutes, publicRoutes } from '@/lib/routes';
import { navLinks } from '@/lib/constant';
import NextLink from '@/components/common/NextLink';
import { getActiveClass } from '@/lib/common';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogInIcon, Menu } from 'lucide-react';
import BasicLoader from '../Loaders/BasicLoader';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TextToImage from '@/components/common/TextToImage';
import MobileHeader from './MobileHeader';

const Header = () => {

    const { router, pathname, theme, states } = useHeader();

    return (
        <header className="w-full flex items-center justify-between p-4 shadow-md sticky top-0 backdrop-blur-lg z-20">
            <div className="logo cursor-pointer flex items-center gap-x-1" onClick={() => router.push(publicRoutes.home)}>
                <h1 className='text-lg md:text-xl font-bold text-primary dark:text-white'>Elevate Financials</h1>
            </div>
            <div className="hidden md:flex links items-center gap-x-4">
                {navLinks.map((li) => {
                    return (
                        <NextLink key={li.redirectLink} href={li.redirectLink} title={li.name} className={getActiveClass(li.redirectLink, pathname, theme)} />
                    )
                })}
            </div>
            <div className='flex items-center gap-x-4'>
                {/* Mode toggle for mobile devices */}
                <div className="md:hidden flex items-center gap-x-1">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger>
                            <Menu />
                        </SheetTrigger>
                        <SheetContent>
                            <MobileHeader theme={theme} pathname={pathname} loading={states.loading} isUser={states.isUser}/>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="sideNavigation hidden md:flex items-center gap-x-2" suppressHydrationWarning>
                    <ModeToggle />
                    {states.loading ? (
                        <BasicLoader />
                    ) : !states.isUser && !states.loading ? (
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
                                <div className=" rounded-full overflow-hidden cursor-pointer  relative group shadow-md shadow-gray-900">
                                    {/* {personalInfo?.profileImg ? (
                                        <img
                                            src={`${backendUrl}${personalInfo?.profileImg}`}
                                            alt="User Profile"
                                            className='w-10 h-10'
                                        />
                                    ) : (
                                        <TextToImage nameText={emailId} />
                                    )} */}
                                    <TextToImage nameText='abc@yopmail.com' />
                                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mr-10">
                                <DropdownMenuLabel className='dark:text-gray-200'>My Account</DropdownMenuLabel>
                                {/* <p className='text-xs ml-2 dark:text-gray-400'>{emailId}</p> */}
                                <p className='text-xs ml-2 dark:text-gray-400'>abc@yopmail.com</p>
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
                                // onClick={() => logout()}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header