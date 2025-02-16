'use client';
import React from 'react';
import Image from 'next/image';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import DefaultButton from '@/widgets/DefaultButton';
import { motion } from "framer-motion";
import ImgSlider from '@/widgets/ImgSlider';
import { Button } from '../ui/button';

const sliderData = [
  { name: 'Visa', src: '/images/visa_logo.png' },
  { name: 'Mastercard', src: '/images/mastercard_logo.png' },
  { name: 'PayPal', src: '/images/paypal_logo.png' },
  { name: 'Razorpay', src: '/images/razorpay_logo.png' },
  { name: 'Stripe', src: '/images/stripe_logo.png' },
  { name: 'SBI Bank', src: '/images/sbi_logo.png' },
  { name: 'ICICI Bank', src: '/images/icici_logo.png' },
];

const Home = () => {
  return (
    <LayoutWrapper>
      <div className='mainHome'>

        {/* Hero */}
        <section className="relative w-full h-[90vh] flex items-center justify-center px-6 md:px-12 lg:px-24 bg-gradient-to-b from-purple-900 to-purple-600 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Banking Made <span className="text-blue-500">Simple</span> & Secure
              </h1>
              <p className="text-lg md:text-xl text-gray-300 dark:text-gray-300">
                Open an account in minutes and experience seamless digital banking with high security and smart features.
              </p>
              <div className="flex gap-4">
                <DefaultButton title='Get started' className='bg-white text-black' />
                <DefaultButton variant='outline' className='text-black' title='Learn more' />
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <Image
                src="/images/banking-image.svg" // Add your image in public folder
                alt="Banking App"
                width={500}
                height={500}
                className="w-full max-w-md md:max-w-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Component 2 */}
        <section className=''>
          <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
            <div className='mr-auto place-self-center lg:col-span-7'>
              <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
                Seamless Banking Solutions
              </h1>
              <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-base lg:text-lg dark:text-gray-400'>
                Experience the next level of financial management with Elevate Financials — your
                trusted partner in modern, efficient, and secure banking solutions
              </p>
              <div className='space-x-2'>
                <DefaultButton title='Get started' />
                <DefaultButton variant='outline' title='View UPI offers' />
              </div>
            </div>
            <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
              <Image
                height={100}
                width={1000}
                src='https://images.unsplash.com/photo-1726137569772-791c3b20b4cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                className='rounded-[10px]'
                alt='mockup'
              />
            </div>
          </div>
        </section>

        {/* Component 3 */}
        <div className='w-full mt-10 shadow-lg p-4'>
          <h1 className='text-2xl  text-center font-bold uppercase text-gray-800 dark:text-white mb-7'>
            Marketing Partners
          </h1>
          <ImgSlider data={sliderData} />
        </div>

      </div>
    </LayoutWrapper>
  );
};

export default Home;
