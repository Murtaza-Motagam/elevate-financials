import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import { showToast, formattedPath } from '@/lib/common';
import { KEYS } from '@/lib/constant';
import { LocalStorage } from '@/lib/localStorage';
import { documentDetails } from '@/schema/register';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface useDocumentDetailsProps {
  onNext: () => void;
  activeStep?: number;
}

interface useDocumentDetailsFieldProps {
  aadharNo: string;
  panNo: string;
  profileImg?: string;
  driverLicence?: string;
  addressProofType?: string;
  addressProofImg?: string;
}

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

const useDocumentDetails = ({ onNext = () => {} }: useDocumentDetailsProps) => {
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
  } = useForm<useDocumentDetailsFieldProps>({
    resolver: yupResolver(documentDetails),
  });

  const onSubmitDocumentDetails = async (data: useDocumentDetailsFieldProps) => {
    setLoading(true);

    const getPersonalData = LocalStorage.getJSON(KEYS.personalDetails);
    const addProofImg = formattedPath(data.addressProofImg || '');
    const profileImg = formattedPath(data.profileImg || '');
    const payload = {
      email: getPersonalData?.email,
      documentDetails: {
        aadharNo: data?.aadharNo,
        panNo: data?.panNo,
        profileImg: profileImg,
        driverLicence: data?.driverLicence,
        addressProof: {
          image: addProofImg,
          type: data?.addressProofType,
        },
      },
    };
    try {
      const resData = await apiRequest<apiRequestProps>({
        url: endpoints.saveDocumentDetails,
        method: 'post',
        data: payload,
      });
      if (resData?.success) {
        LocalStorage.setJSON(KEYS.documentDetails, resData?.details);
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
  return {
    hookform,
    onSubmitDocumentDetails,
    loading,
  };
};

export default useDocumentDetails;
