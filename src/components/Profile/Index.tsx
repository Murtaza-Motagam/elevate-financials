'use client';
import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import ProfileSidebar from './Sidebar/Index';
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs';
import { sidebarLinks } from '@/lib/constant';

// Import Components (Add actual imports here)
import MyAccounts from '@/components/Profile/MyAccounts/Index';
import Dashboard from './Dashboard/Index';
import PageLoader from '@/shared/Loaders/PageLoader';
import { useSearchParams } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { PanelRight } from 'lucide-react';

// Components map
const componentsMap: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    "My Account": <MyAccounts />,
};

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const searchParams = useSearchParams();

    const handleClose = () => {
        setOpen(false);
    }


    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (!tabParam) {
            setSelectedTab(0);
        } else {
            setSelectedTab(parseInt(tabParam, 10));
        }
        setLoading(false);
    }, [searchParams, setLoading, setSelectedTab]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-screen">
                <PageLoader />
            </div>
        )
    }

    return (
        <LayoutWrapper>
            <div className="w-full mx-4 md:hidden block">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger onClick={() => setOpen(true)}>
                        <PanelRight size={35} className='dark:text-gray-200 dark:hover:text-white rounded-full p-2 cursor-pointer' />
                    </SheetTrigger>
                    <SheetContent>
                        <ProfileSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} setLoading={setLoading} onSmallDv={true} handleClose={handleClose} />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="w-full flex items-start overflow-hidden mt-5">
                <div className="hidden md:block w-[240px]">
                    <ProfileSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} setLoading={setLoading} handleClose={handleClose} />
                </div>
                <div className="w-5/6">
                    <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                        <TabList className="hidden">
                            {sidebarLinks.flatMap((category) =>
                                category.links.map((link) => <Tab key={link.name}>{link.name}</Tab>)
                            )}
                        </TabList>
                        <div className="w-full">
                            {sidebarLinks.flatMap((category) =>
                                category.links.map((link) => (
                                    <TabPanel key={link.name} className="">
                                        {componentsMap[link.name] || <p>Component not found</p>}
                                    </TabPanel>
                                ))
                            )}
                        </div>
                    </Tabs>
                </div>
            </div>
        </LayoutWrapper>
    );

};

export default Profile;
