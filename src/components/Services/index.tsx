'use client'

import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import { servicesData } from './utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Services = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <LayoutWrapper>
            <section className="max-w-7xl px-5 mt-10 m-auto">
                <div className="mt-10">
                    {servicesData.map((section) => (
                        <div className="mb-10" key={section.sectionName}>
                            <h1 className='flex text-lg md:text-2xl text-gray-800 dark:text-gray-100 font-bold items-center gap-x-2 border-b pb-3 border-gray-400'>
                                <section.icon className={section.iconClass} />
                                {section.sectionName}
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3">
                                {section.subSections.map((subS) => (
                                    <Link key={subS.name} href={subS.link} className='text-sm flex items-center gap-x-2 font-medium hover:bg-gray-50 duration-200 ease-in p-3 border border-slate-400 rounded-md dark:hover:bg-slate-800'>
                                        <subS.icon className={subS.iconClass} />
                                        {subS.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </LayoutWrapper>
    );
};

export default Services;
