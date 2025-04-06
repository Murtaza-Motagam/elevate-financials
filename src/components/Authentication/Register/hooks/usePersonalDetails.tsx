import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import { showToast } from '@/lib/common';
import { LocalStorage } from '@/lib/localStorage';
import { personalDetails } from '@/schema/register';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface usePersonalDetailProps {
  onNext: () => void;
}

interface personalDetailFieldProps {
  firstName: string;
  lastName: string;
  genderNm: string;
  dob: Date;
  mobNo: string;
  email: string;
}

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

const usePersonalDetails = ({ onNext = () => {} }: usePersonalDetailProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<personalDetailFieldProps>({
    resolver: yupResolver(personalDetails),
  });

  const onSubmitPersonalDetails = async (data: personalDetailFieldProps) => {
    setLoading(true);
    const { firstName, lastName, email, mobNo, dob, genderNm } = data;
    const personalDetails = {
      firstName,
      lastName,
      email,
      mobNo,
      dob,
      gender: genderNm,
    };
    try {
      const resData = await apiRequest<apiRequestProps>({
        url: endpoints.savePersonalDetails,
        method: 'post',
        data: { personalDetails },
      });
      if (resData?.success) {
        LocalStorage.setJSON('personalDetails', resData?.details?.personalDetails);
        showToast(resData?.message, 'success');
        onNext();
      } else {
        showToast(resData?.message, 'error');
      }
    } catch (err) {
      console.error('error: ', err);
    } finally {
      setLoading(false);
    }
  };

  const hookform = { register, reset, handleSubmit, errors, control, watch };
  return {
    hookform,
    onSubmitPersonalDetails,
    loading,
  };
};

export default usePersonalDetails;
