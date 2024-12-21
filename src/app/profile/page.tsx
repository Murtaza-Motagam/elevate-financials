import Profile from '@/components/Profile/Index'
import Head from 'next/head'
import React from 'react'

const ProfilePage = () => {
    return (
        <>
            <Head>
                <meta name='viewport' content='width=1500'></meta>
            </Head>
            <Profile />
        </>
    )
}

export default ProfilePage
