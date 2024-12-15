'use client';
import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import ProfileSidebar from './Sidebar/Index';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { sidebarLinks } from '@/lib/constant';

// Import Components (Add actual imports here)
import MyAccounts from '@/components/Profile/MyAccounts/Index';
import Dashboard from './Dashboard/Index';
import PageLoader from '@/shared/Loaders/PageLoader';
import { useSearchParams } from 'next/navigation';

// Components map
const componentsMap: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    "My Account": <MyAccounts />,
};

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

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
            <div className="w-full grid lg:grid-cols-12">
                <div className="col-span-2">
                    <ProfileSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} setLoading={setLoading} />
                </div>
                <div className="col-span-10">
                    <div className="w-3/4">
                        <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                            <TabList className="hidden">
                                {sidebarLinks.flatMap((category) =>
                                    category.links.map((link) => <Tab key={link.name}>{link.name}</Tab>)
                                )}
                            </TabList>

                            {sidebarLinks.flatMap((category) =>
                                category.links.map((link) => (
                                    <TabPanel key={link.name} className="">
                                        {componentsMap[link.name] || <p>Component not found</p>}
                                    </TabPanel>
                                ))
                            )}
                        </Tabs>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );

};

export default Profile;
