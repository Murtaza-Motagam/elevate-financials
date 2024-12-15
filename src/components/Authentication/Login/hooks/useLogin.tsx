import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { backendUrl, KEYS } from '@/lib/constant';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LocalStorage } from '@/lib/localStorage';
import { showToast } from '@/lib/common';
import { publicRoutes } from '@/lib/routes';
import { useRouter } from 'next/navigation';

interface LoginValues {
  crnNumber: string;
  password: string;
}

export const loginSchema = yup.object().shape({
  crnNumber: yup
    .string()
    .matches(/^\d{8}$/, "CRN number must be exactly 8 digits")
    .required("CRN number is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required"),
});

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true)

    const url = `${backendUrl}/auth/login`;
    const response = await axios({
      url,
      data: {
        crnNumber: data?.crnNumber,
        password: data?.password,
      },
      method: 'post'
    });
    const resData = response.data;
    if (resData?.success) {
      const LocalData = {
        token: resData?.authtoken,
      }
      Cookies.set('Authorization-token', resData.authtoken, { expires: 7, secure: true });
      LocalStorage.setJSON(KEYS.authDetails, LocalData);
      showToast(resData?.message, 'success');
      router.push(publicRoutes.home);
    }
    else {
      showToast(resData?.message, 'error')
    }
    setLoading(false)
  }


  const hookform = { register, reset, handleSubmit, errors };

  return {
    hookform,
    onSubmit,
    loading,
  }
}

export default useLogin
