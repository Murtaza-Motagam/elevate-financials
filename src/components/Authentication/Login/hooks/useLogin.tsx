import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { KEYS } from '@/lib/constant';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LocalStorage } from '@/lib/localStorage';
import { showToast } from '@/lib/common';
import { publicRoutes } from '@/lib/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { loginSchema } from '@/schema/loginSchema';
import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';

interface LoginValues {
  username: string;
  password: string;
}

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  authtoken: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchUser } = useUser();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    const resData = await apiRequest<apiRequestProps>({
      url: endpoints.login,
      method: 'post',
      data: {
        username: data?.username,
        password: data?.password,
      },
    });
    if (resData?.success) {
      const LocalData = {
        token: resData?.authtoken,
      };
      Cookies.set('Authorization-token', resData.authtoken, {
        expires: 7,
      });
      await axios.post('/api/user', {
        user: {
          id: resData?.user?._id,
          profileImg: resData?.user?.documentDetails?.profileImg,
          firstName: resData?.user?.personalDetails?.firstName,
          lastName: resData?.user?.personalDetails?.lastName,
          name: `${resData?.user?.personalDetails?.firstName} ${resData?.user?.personalDetails?.lastName}`,
          username: resData?.user?.authentication?.username,
          mobNo: resData?.user?.personalDetails?.mobNo,
          status: resData?.user?.status,
          email: resData?.user?.personalDetails?.email,
          role: resData?.user?.authentication?.roles?.[0],
          accountDetails: resData?.user?.accountDetails,
        },
        token: resData?.authtoken,
      });
      fetchUser();
      LocalStorage.setJSON(KEYS.authDetails, LocalData);
      showToast(resData?.message, 'success');
      const callbackUrl = searchParams.get('redirect') || publicRoutes.home;
      router.push(callbackUrl);
    } else {
      showToast(resData?.message, 'error');
    }
    setLoading(false);
  };

  const hookform = { register, reset, handleSubmit, errors };

  return {
    hookform,
    onSubmit,
    loading,
  };
};

export default useLogin;
