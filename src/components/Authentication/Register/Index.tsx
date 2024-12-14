'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { authenticationRoutes, publicRoutes } from '@/lib/routes';
import NextLink from '@/components/common/NextLink';
import PersonalDetails from './Steps/PersonalDetails';
import DocumentDetails from './Steps/DocumentDetails';
import BankingDetails from './Steps/BankingDetails';
import useRegister from './hooks/useRegister';
import PageLoader from '@/shared/Loaders/PageLoader';

const Register = () => {

    const [activeStep, setActiveStep] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const { getPersonalDetails, getDocumentDetails } = useRegister();

    useEffect(() => {
        setLoading(true); 
    
        if (getPersonalDetails?.email && !getDocumentDetails?.aadharNo) {
            setActiveStep(2);
        } else if (getPersonalDetails?.email && getDocumentDetails?.aadharNo) {
            setActiveStep(3);
        } else {
            setActiveStep(1);
        }
    
        setLoading(false); 
    }, [getPersonalDetails, getDocumentDetails]);

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-full">
                {loading ? (
                    <div className='container m-auto w-full md:w-1/2 flex items-center justify-center'>
                        <PageLoader />
                    </div>
                ) : (
                    <div className="container m-auto w-full md:w-1/2 grid grid-cols-1 py-10 px-2 md:px-5">
                        <div className="w-full md:w-3/4 mx-auto px-5 md:px-0">
                            <div className="mt-10">
                                <NextLink href={publicRoutes.home} title='Elevate Financials' className='text-primary font-bold hover:text-black dark:hover:text-white uppercase' />
                                <h2 className="text-2xl md:text-3xl flex items-center gap-x-2 mb-2 flex-wrap font-semibold">
                                    Create Your Account
                                </h2>
                                <p className="text-xs mb-8">Enter to get tons of rewards and cashbacks.</p>
                            </div>
                            {/* Stepper Component */}

                            {activeStep === 1 && (
                                <PersonalDetails onNext={() => setActiveStep(2)} />
                            )}
                            {activeStep === 2 && (
                                <DocumentDetails onNext={() => setActiveStep(3)} />
                            )}
                            {activeStep === 3 && (
                                <BankingDetails />
                            )}

                            <p className="text-center my-4 dark:text-gray-400">
                                Already have an account? <NextLink href={authenticationRoutes.login} title='Login' className="text-md text-primary hover:underline" />
                            </p>
                        </div>

                    </div>
                )}
                <div className="hidden md:block relative w-1/2">
                    <Image
                        src='https://images.unsplash.com/photo-1691045118425-57e55304435e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="Background"
                        fill
                        className='w-full'
                    />
                </div>
            </div>
        </>
    );
};

export default Register;
