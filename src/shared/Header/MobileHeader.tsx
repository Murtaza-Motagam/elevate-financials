import NextLink from '@/components/common/NextLink'
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { navLinks } from '@/lib/constant'
import { getActiveClassMobile } from '@/lib/common';
import React from 'react'
import BasicLoader from '../Loaders/BasicLoader';
import { useRouter } from 'next/navigation';
import { authenticationRoutes, protectedRoutes } from '@/lib/routes';
import { LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
    theme?: string | undefined;
    loading: boolean;
    isUser: boolean | undefined;
    pathname: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ theme, pathname, loading, isUser }) => {
    const router = useRouter();
    return (
        <>
            <SheetHeader>
                <SheetTitle className='text-white uppercase'>Elevate <span className="text-primary"> Financials</span></SheetTitle>
                <SheetDescription>
                    Elevate your financial growth for your secure future.
                </SheetDescription>

                <div className="w-full mt-4 flex flex-col gap-y-5 text-center">
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
                        <NextLink title='My Profile' href={protectedRoutes.profile} className={getActiveClassMobile(protectedRoutes.profile, pathname, theme)}/>
                    )}
                </div>
                <div className="w-full mt-4 flex flex-col gap-y-5 text-center">
                    {navLinks.map((li) => {
                        return (
                            <NextLink key={li.redirectLink} title={li.name} href={li.redirectLink} className={getActiveClassMobile(li.redirectLink, pathname, theme)} />
                        )
                    })}
                </div>
            </SheetHeader>
        </>
    )
}

export default MobileHeader