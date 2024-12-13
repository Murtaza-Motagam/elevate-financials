import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

interface LoginValues {
  crnNumber: string;
  password: string;
}

export const loginSchema = yup.object().shape({
  crnNumber: yup
    .string()
    .matches(/^\d{6}$/, "CRN number must be exactly 6 digits")
    .required("CRN number is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required"),
});

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { register, reset, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true)
    console.log(data);
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
