import { useEffect, useState } from 'react'
import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import Cookies from 'js-cookie';
import { showToast } from '@/lib/common';
import { KEYS } from '@/lib/constant';
import { LocalStorage } from '@/lib/localStorage';
import { publicRoutes } from '@/lib/routes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface apiRequestProps {
    url: string;
    method: string;
    success: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    authtoken: string;
}

const useOtpVerify = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (otp.length === 6) {
            handleVerify(otp);
        }
    }, [otp]);

    const handleVerify = async (otp: string) => {
        setLoading(true);
        const getPersonalData = LocalStorage.getJSON(KEYS.personalDetails);
        try {
            const resData = await apiRequest<apiRequestProps>({
                url: endpoints.verifyOtp,
                method: 'post',
                data: {
                    email: getPersonalData?.email,
                    otpNumber: otp
                },
            })
            if (resData?.success) {
                Cookies.set('Authorization-token', resData.authtoken, { expires: 7, secure: true });
                LocalStorage.setJSON(KEYS.authDetails, {
                    token: resData?.authtoken
                });
                const { data } = resData;
                await axios.post('/api/user', {
                    user: {
                        id: data?._id,
                        profileImg: data?.documentDetails?.profileImg,
                        firstName: data?.personalDetails?.firstName,
                        lastName: data?.personalDetails?.lastName,
                        name: `${data?.personalDetails?.firstName} ${data?.personalDetails?.lastName}`,
                        username: data?.authentication?.username,
                        mobNo: data?.personalDetails?.mobNo,
                        status: data?.status,
                        email: data?.personalDetails?.email,
                        role: data?.authentication?.roles?.[0],
                        accountDetails: data?.accountDetails,
                    },
                    token: resData?.authtoken,
                });
                showToast(resData?.message, 'success');
                router.push(publicRoutes.bankingDetail);
            } else {
                showToast(resData?.message, 'error');
            }
        } catch (err) {
            console.error('error: ', err);
            showToast('Some error has occurred. Please wait for some time', 'error');
        } finally {
            setLoading(false);
        }
    };


    return {
        otp,
        setOtp,
        loading
    }
}

export default useOtpVerify
