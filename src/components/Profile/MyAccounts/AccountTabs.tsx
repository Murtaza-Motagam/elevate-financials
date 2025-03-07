import React from 'react';
import Overview from './tabs/Overview';
import Cards from './tabs/Cards';
import ChangePassword from './tabs/ChangePassword';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import 'react-tabs/style/react-tabs.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const account_tabs = {
  overview: 'overview',
  cards: 'cards',
  changePassword: 'changePassword',
};

interface accInfoProps {
  balance?: number;
  accNumber?: number;
}

export interface AccountTabsProps {
  accInfo?: accInfoProps;
}

const AccountTabs = ({ accInfo }: AccountTabsProps) => {
  return (
    <div className='-ml-6 p-6'>
      {/* Page Title & Notifications */}
      <div className='flex justify-between border-b border-gray-300 pb-3 items-center mb-6'>
        <h1 className='font-bold text-xl text-gray-800 dark:text-white'>Account details</h1>
        <Button variant='ghost' size='icon'>
          <Bell className='w-6 h-6' />
        </Button>
      </div>

      {/* Tabs for Different Sections */}

      <Tabs defaultValue={account_tabs.overview} className='w-full !h-[40vh]'>
        <TabsList className='mb-5'>
          <TabsTrigger className='md:w-[200px]' value='overview'>
            Overview
          </TabsTrigger>
          <TabsTrigger className='md:w-[200px]' value='cards'>
            Cards
          </TabsTrigger>
          <TabsTrigger className='md:w-[200px]' value='changePassword'>
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value={account_tabs.overview}>
          <Overview accInfo={accInfo} />
        </TabsContent>
        <TabsContent value={account_tabs.cards}>
          <Cards accInfo={accInfo} />
        </TabsContent>
        <TabsContent value={account_tabs.changePassword}>
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;
