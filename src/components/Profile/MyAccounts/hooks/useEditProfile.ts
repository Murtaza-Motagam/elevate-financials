import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import { showToast } from '@/lib/common';
import { editProfileSchema } from '@/schema/editProfileSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditProfileFields {
  profileImg?: string | null;
  username?: string | null;
  email?: string | null;
  accountType?: string | null;
}

const defaultValues = {
  profileImg: '',
  username: '',
  email: '',
  accountType: '',
};

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const useEditProfile = ({
  open = false,
  closeModal = () => {},
  fetchUserInfo = () => {},
}: {
  open: boolean;
  closeModal: () => void;
  fetchUserInfo: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    control,
    watch,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFields>({
    defaultValues,
    resolver: yupResolver(editProfileSchema),
  });

  const hookform = {
    register,
    reset,
    handleSubmit,
    errors,
    setError,
    setValue,
    clearErrors,
    control,
    watch,
  };

  const onSubmit = async (data: EditProfileFields) => {
    setLoading(true);
    try {
      const response = await apiRequest<apiRequestProps>({
        url: endpoints.updateProfile,
        method: 'put',
        data,
      });
      const resData = response.user;
      if (response.success) {
        showToast(response?.message);
        await axios.post('/api/updateUser', {
          user: {
            id: resData?._id,
            profileImg: resData?.documentDetails?.profileImg,
            firstName: resData?.personalDetails?.firstName,
            lastName: resData?.personalDetails?.lastName,
            name: `${resData?.personalDetails?.firstName} ${resData?.personalDetails?.lastName}`,
            username: resData?.authentication?.username,
            mobNo: resData?.personalDetails?.mobNo,
            status: resData?.status,
            email: resData?.personalDetails?.email,
            role: resData?.authentication?.roles?.[0],
            accountDetails: resData?.accountDetails,
          },
        });
        fetchUserInfo();
        closeModal();
      } else {
        showToast(response?.message, 'error');
      }
    } catch (err) {
      console.error('error: ', err);
      showToast('Some error has occurred. Please wait for some time', 'error');
    } finally {
      reset(defaultValues);
      setLoading(false);
      closeModal();
    }
  };

  const getProfileData = async () => {
    const getUser = await axios.get('/api/user');
    const { data } = getUser.data;
    setValue('profileImg', data.profileImg);
    setValue('username', data.username);
    setValue('email', data.email);
    setValue('accountType', data.accountDetails?.accountType);
  };

  useEffect(() => {
    if (open) {
      getProfileData();
    }
  }, [open]);

  return {
    hookform,
    loading,
    onSubmit,
  };
};

export default useEditProfile;
