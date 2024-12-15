import LayoutWrapper from '@/shared/wrapper/LayoutWrapper'
import DefaultButton from '@/widgets/DefaultButton'
import React from 'react'
import Image from 'next/image'

const Home = () => {
    return (
        <LayoutWrapper>
            <div className="mainHome">
                <section className="">
                    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7">
                            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Seamless Banking Solutions</h1>
                            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-base lg:text-lg dark:text-gray-400">Experience the next level of financial management with Elevate Financials — your trusted partner in modern, efficient, and secure banking solutions</p>
                            <div className="space-x-2">
                                <DefaultButton title='Create Account' />
                                <DefaultButton variant='outline' title='View UPI offers' />
                            </div>
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <Image height={100} width={1000} src="https://images.unsplash.com/photo-1726137569772-791c3b20b4cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='rounded-[10px]' alt="mockup" />
                        </div>
                    </div>
                </section>
            </div>
        </LayoutWrapper>
    )
}

export default Home
