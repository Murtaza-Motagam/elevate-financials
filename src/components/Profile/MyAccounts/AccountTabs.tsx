import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from './tabs/Overview';
import Cards from './tabs/Cards';
import ChangePassword from './tabs/ChangePassword';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const account_tabs = {
    overview: 'overview',
    cards: 'cards',
    changePassword: 'changePassword',
}

interface accInfoProps {
    balance?: number;
    accNumber?: number;
}

export interface AccountTabsProps {
    accInfo?: accInfoProps;
}

const AccountTabs = ({ accInfo }: AccountTabsProps) => {

    const [selectedTab, setSelectedTab] = useState(account_tabs.overview);

    return (
        <div className="-ml-6 p-6">
            {/* Page Title & Notifications */}
            <div className="flex justify-between border-b border-gray-300 pb-3 items-center mb-6">
                <h1 className='font-bold text-xl text-gray-800 dark:text-white'>
                    Account Details
                </h1>
                <Button variant="ghost" size="icon">
                    <Bell className="w-6 h-6" />
                </Button>
            </div>

            {/* Tabs for Different Sections */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-4 pl-5 gap-4 rounded-md md:py-6">
                    <TabsTrigger className='md:-mt-[17.5px] md:py-2' value="overview">Overview</TabsTrigger>
                    <TabsTrigger className='md:-mt-[17.5px] md:py-2' value="cards">Cards</TabsTrigger>
                    <TabsTrigger className='md:-mt-[17.5px] md:py-2' value="changePassword">Security</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Tab Content */}
            <div className="mt-6">
                {selectedTab === account_tabs.overview && (
                    <Overview accInfo={accInfo} />
                )}

                {selectedTab === account_tabs.cards && (
                    <Cards accInfo={accInfo} />
                )}

                {selectedTab === account_tabs.changePassword && (
                    <ChangePassword />
                )}
            </div>
        </div>
    )
}

export default AccountTabs
