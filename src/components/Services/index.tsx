'use client';

import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import { servicesData } from './utils';
import Link from 'next/link';

const Services = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <LayoutWrapper>
      <h1 className='text-lg md:text-2xl font-bold mt-5 text-center md:max-w-6xl mx-auto pb-2 border-b-2 border-slate-500 uppercase'>
        Offered Services
      </h1>
      <section className='max-w-7xl px-5 mt-10 m-auto flex gap-6'>
        <div className='w-full md:w-3/4'>
          {servicesData.map((section) => (
            <div className='mb-10' key={section.sectionName}>
              <h1 className='flex text-lg md:text-2xl text-gray-800 dark:text-gray-100 font-bold items-center gap-x-2 border-b pb-3 border-gray-400'>
                <section.icon className={section.iconClass} />
                {section.sectionName}
              </h1>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-3'>
                {section.subSections.map((subS) => (
                  <Link
                    key={subS.name}
                    href={subS.link}
                    className='text-sm flex items-center gap-x-2 font-medium hover:bg-gray-50 duration-200 ease-in p-3 border border-slate-400 rounded-md dark:hover:bg-slate-800'
                  >
                    <subS.icon className={subS.iconClass} />
                    {subS.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <aside className='hidden md:block w-1/4 p-4 bg-gray-100 border-2 h-fit dark:bg-slate-900 rounded-lg shadow-md'>
          <h1 className='text-lg font-bold text-gray-800 dark:text-gray-100 border-b pb-2'>
            Quick actions
          </h1>
          <ul className='mt-3 space-y-2'>
            <li className='p-2 text-sm font-medium border-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
              View Recent Transactions
            </li>
            <li className='p-2 text-sm font-medium border-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
              Quick Transfer
            </li>
            <li className='p-2 text-sm font-medium border-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
              Pay Bills
            </li>
            <li className='p-2 text-sm font-medium border-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
              Check Loan Status
            </li>
          </ul>
        </aside>
      </section>
    </LayoutWrapper>
  );
};

export default Services;
