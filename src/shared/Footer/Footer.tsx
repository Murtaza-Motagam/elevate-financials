import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import NextLink from '@/components/common/NextLink';
import LazyLoadImg from '@/widgets/LazyLoadImg';

const Footer = () => {
  return (
    <footer className='border-t-2 bg-gray-50 dark:bg-transparent py-10 !z-[40]'>
      <div className='container mx-auto px-6 lg:px-16'>
        {/* Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Logo and Description */}
          <div className='flex flex-col items-start'>
            <h2 className='text-lg md:text-xl font-bold text-primary dark:text-white flex items-start gap-x-2'>
              <LazyLoadImg
                src='/images/logo.png'
                alt='logo'
                className='md:w-14 md:h-14 w-10 h-10 object-contain border-2 border-gray-800 dark:border-2 dark:border-gray-200 rounded-full'
              />
              <p className='md:mt-2 mt-1 flex flex-col items-center md:items-start justify-start'>
                <span className='md:text-xl'>
                  Elevate <span className='text-tertiary dark:text-white'>Financials</span>
                </span>
                <span className='text-xs text-gray-700 dark:text-gray-300 hidden md:block'>
                  Empowering your financial future.
                </span>
              </p>
            </h2>
            <p className='dark:text-gray-400 text-sm mt-3'>
              Secure and reliable banking solutions for your financial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-wrap items-center gap-x-20 gap-y-10'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick links</h3>
              <ul className='dark:text-gray-400 space-y-2'>
                <li>
                  <NextLink href='#'>Home</NextLink>
                </li>
                <li>
                  <NextLink href='#'>Services</NextLink>
                </li>
                <li>
                  <NextLink href='#'>About us</NextLink>
                </li>
                <li>
                  <NextLink href='#'>Contact our officials</NextLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Customer support</h3>
              <ul className='dark:text-gray-400 space-y-2'>
                <li>
                  <NextLink href='#'>Help center</NextLink>
                </li>
                <li>
                  <NextLink href='#'>FAQs</NextLink>
                </li>
                <li>
                  <NextLink href='#'>Report an issue</NextLink>
                </li>
                <li>
                  <NextLink href='#'>Security & Privacy</NextLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Follow us</h3>
            <div className='flex space-x-4 dark:text-gray-400'>
              <NextLink href='#'>
                <Facebook size={24} />
              </NextLink>
              <NextLink href='#'>
                <Twitter size={24} />
              </NextLink>
              <NextLink href='#'>
                <Linkedin size={24} />
              </NextLink>
              <NextLink href='#'>
                <Instagram size={24} />
              </NextLink>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-700 mt-8 pt-4 text-center'>
          © Copyright {new Date().getFullYear()} Elevate-financials. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
