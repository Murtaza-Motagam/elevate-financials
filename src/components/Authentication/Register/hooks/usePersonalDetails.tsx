import { showToast } from '@/lib/common';
import { backendUrl } from '@/lib/constant';
import { LocalStorage } from '@/lib/localStorage';
import { personalDetails } from '@/schema/register';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
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
      const url = `${backendUrl}/auth/save-personal-details`;
      const response = await axios({
        url,
        data: { personalDetails },
        method: 'post',
      });
      const resData = response.data;
      if (resData?.success) {
        LocalStorage.setJSON('personalDetails', resData?.details?.personalDetails);
        showToast(resData?.message, 'success');
        onNext();
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

  const hookform = { register, reset, handleSubmit, errors, control, watch };
  return {
    hookform,
    onSubmitPersonalDetails,
    loading,
  };
};

export default usePersonalDetails;
