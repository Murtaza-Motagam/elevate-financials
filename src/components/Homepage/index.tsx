'use client';
import React from 'react';
import Image from 'next/image';
import LayoutWrapper from '@/shared/wrapper/LayoutWrapper';
import DefaultButton from '@/widgets/DefaultButton';
import { motion } from 'framer-motion';
import ImgSlider from '@/widgets/ImgSlider';
import { Card, CardContent } from '../ui/card';
import { mainHeroContent, sliderData } from './utils';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { publicRoutes } from '@/lib/routes';
import NextLink from '../common/NextLink';

const Home = () => {
  return (
    <LayoutWrapper>
      <div className='mainHome'>
        {/* Hero */}
        <section className='relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pb-10 px-6'>
          {/* Background Blur Effects */}
          <div className='absolute inset-0 flex justify-center items-center'>
            <div className='w-64 h-64 md:w-96 md:h-96 bg-blue-400 opacity-30 blur-3xl rounded-full'></div>
            <div className='w-48 h-48 md:w-72 md:h-72 bg-purple-500 opacity-20 blur-[80px] md:blur-[100px] rounded-full absolute top-10 left-10 md:left-20'></div>
          </div>

          {/* Content Section */}
          <div className='relative z-10 flex flex-col items-center text-center mt-20 md:m-0 max-w-lg md:max-w-2xl'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className='text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight'
            >
              Smart & Secure <span className='text-primary'>Banking</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className='mt-4 text-base sm:text-lg md:text-xl dark:text-gray-300 max-w-sm sm:max-w-md md:max-w-2xl'
            >
              Experience the future of banking with AI-driven insights, seamless transactions, and
              top-tier security.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className='mt-6 flex flex-wrap gap-4 justify-center'
            >
              <NextLink
                href={publicRoutes.services}
                className='rounded-full px-6 py-3 sm:px-7 sm:py-2.5 text-primary dark:text-white hover:text-white transition-all duration-300 border-2 border-primary hover:bg-primary'
              >
                Get started
              </NextLink>
            </motion.div>
          </div>

          {/* Floating Banking Cards */}
          <div className='md:absolute md:bottom-10 mt-10 w-full px-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:flex gap-6 justify-center'>
              {mainHeroContent.map((hc) => (
                <motion.div
                  key={hc.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Card className='bg-white/10 border border-white/20 shadow-lg w-full max-w-xs p-4 text-center mx-auto'>
                    <CardContent className='flex flex-col items-center'>
                      <hc.icon className={hc.iconClass} />
                      <h3 className='text-lg sm:text-xl dark:text-white font-semibold mt-2'>
                        {hc.name}
                      </h3>
                      <p className='text-gray-700 dark:text-gray-100 text-sm sm:text-base'>
                        {hc.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Component 1 */}
        <section className='relative w-full h-[90vh] flex items-center justify-center px-6 md:px-12 lg:px-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl w-full'>
            {/* Left Content */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
              viewport={{ once: false, amount: 0.2 }} // Animation triggers every time it enters the viewport
              className='flex flex-col justify-center space-y-6'
            >
              <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
                Banking Made Simple & Secure
              </h1>
              <p className='text-lg md:text-xl text-gray-700 dark:text-gray-300'>
                Open an account in minutes and experience seamless digital banking with high
                security and smart features.
              </p>
              <div className='flex gap-4'>
                <DefaultButton variant='destructive' className='text-white' title='Learn more' />
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
              viewport={{ once: false, amount: 0.2 }}
              className='flex justify-center'
            >
              <Image
                src='/images/banking-image.svg' // Add your image in public folder
                alt='Banking App'
                width={500}
                height={500}
                className='w-full max-w-md md:max-w-lg'
              />
            </motion.div>
          </div>
        </section>

        {/* Component 2 */}
        <section className='bg-gray-100 dark:bg-slate-900'>
          <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -50 }}
              viewport={{ once: false, amount: 0.2 }} // Animation triggers every time it enters the viewport
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className='hidden lg:mt-0 lg:col-span-5 lg:flex'
            >
              <Image
                height={100}
                width={1000}
                src='https://images.unsplash.com/photo-1726137569772-791c3b20b4cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                className='rounded-[10px]'
                alt='mockup'
              />
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: false, amount: 0.2 }} // Animation triggers every time it enters the viewport
              className='ml-auto place-self-center lg:col-span-7'
            >
              <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
                Seamless Banking Solutions
              </h1>
              <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-base lg:text-lg dark:text-gray-400'>
                Experience the next level of financial management with Elevate Financials — your
                trusted partner in modern, efficient, and secure banking solutions.
              </p>
              <div className='space-x-2'>
                <DefaultButton
                  title='Explore offers'
                  className='border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white dark:text-white'
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Component 3 */}
        <div className='w-full mt-10 shadow-lg p-4'>
          <h1 className='text-2xl  text-center font-bold uppercase text-gray-800 dark:text-white mb-7'>
            Marketing Partners
          </h1>
          <ImgSlider data={sliderData} />
        </div>

        {/* Component - 4 */}
        <section className='relative flex items-center justify-center my-5 md:my-20 h-[90vh] w-full px-6 md:px-12 lg:px-24 overflow-hidden'>
          {/* Background Vector Image */}
          <div className='absolute inset-0'>
            <LazyLoadImg
              src='images/digital-transaction.svg'
              alt='Background'
              className='w-full h-full object-contain opacity-70'
            />
          </div>

          <div className='relative z-10 max-w-4xl text-center'>
            {/* Animated Title with Popup Effect */}
            <motion.h1
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.5 }}
              className='text-5xl md:text-7xl font-extrabold leading-tight'
            >
              The Future of <span className='text-primary'>Digital Banking</span>
            </motion.h1>

            {/* Animated Subtitle with Popup Effect */}
            <motion.p
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.5 }}
              className='mt-6 text-lg md:text-xl text-black dark:text-gray-300'
            >
              Secure. Seamless. Smart. Elevate your financial experience with our innovative banking
              solutions tailored for the modern era.
            </motion.p>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
