'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { authenticationRoutes, publicRoutes } from '@/lib/routes';
import NextLink from '@/components/common/NextLink';
import GoogleLogo from '@/icons/GoogleLogo'
import PersonalDetails from './Steps/PersonalDetails';
import BankingPreference from './Steps/BankingPreference';
import FinalDetails from './Steps/FinalDetails';

const Register = () => {

    const [activeStep, setActiveStep] = useState(1);

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-full">
                <div className="w-full md:w-1/2 flex flex-col md:justify-center md:items-center mt-15 md:mt-0 min-h-screen p-6 md:p-10">
                    <div className="container mx-auto w-full">
                        <span className='text-primary font-bold uppercase'>Elevate Financials</span>
                        <h2 className="text-2xl md:text-3xl flex items-center gap-x-2 mb-2 flex-wrap font-semibold">
                            Create Your Account
                        </h2>
                        <p className="text-xs mb-8">Enter to get tons of rewards and cashbacks.</p>
                        {/* Stepper Component */}

                        {activeStep === 1 && (
                            <PersonalDetails activeStep={activeStep} onNext={() => setActiveStep(2)}/>
                        )}
                        {activeStep === 2 && (
                            <BankingPreference activeStep={activeStep} onNext={() => setActiveStep(3)} />
                        )}
                        {activeStep === 3 && (
                            <FinalDetails activeStep={activeStep} />
                        )}

                        <div className="my-6 w-full flex items-center justify-center gap-x-2 text-center dark:text-gray-400">
                            <span>Or visit </span>
                            <NextLink title='Home' className='text-primary hover:underline !px-0 !py-0' href={publicRoutes.home} />
                        </div>
                        <button className="px-10 mx-auto flex items-center justify-center border border-gray-300 py-2 rounded-md gap-x-2 dark:text-gray-200">
                            <GoogleLogo />
                            Login with Google
                        </button>
                        <p className="text-center mt-6 dark:text-gray-400">
                            Already have an account? <NextLink href={authenticationRoutes.login} title='Login' className="text-md text-primary hover:underline" />
                        </p>
                    </div>
                </div>
                <div className="hidden md:block relative w-1/2">
                    <Image
                        src='https://images.unsplash.com/photo-1691045118425-57e55304435e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="Background"
                        fill
                        className='w-full'
                    // fill
                    />
                </div>
            </div>
        </>
    );
};

export default Register;
