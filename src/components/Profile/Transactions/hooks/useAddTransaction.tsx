import apiRequest from '@/lib/api';
import { showToast } from '@/lib/common';
import { endpoints } from '@/lib/apiEndpoint';
import { transactionSchema } from '@/schema/transactionSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

interface useAddTransactionProps {
  receiverAccNum: string;
  amt: string;
  remarks?: string | undefined;
  transactionTypeNm: string;
}

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const defaultValues = {
  receiverAccNum: '',
  amt: '',
  remarks: '',
  transactionTypeNm: '',
};

const useAddTransaction = ({
  setOpen = () => {},
  getTransaction = () => {},
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  getTransaction?: () => void;
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
  } = useForm<useAddTransactionProps>({
    defaultValues,
    resolver: yupResolver(transactionSchema),
  });

  const closeModal = () => {
    reset(defaultValues);
    setOpen(false);
  };

  const createTransaction = async (data: useAddTransactionProps) => {
    setLoading(true);
    const { receiverAccNum, amt, ...rest } = data;
    const payload = {
      receiverAccNum: parseInt(receiverAccNum),
      amt: parseInt(amt),
      ...rest,
    };
    try {
      const response = await apiRequest<apiRequestProps>({
        url: endpoints.createTransaction,
        method: 'post',
        data: payload,
      });

      if (response.success) {
        showToast(response?.message);
        closeModal();
        getTransaction();
      } else {
        showToast(response?.message, 'error');
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
    loading,
    createTransaction,
    closeModal,
  };
};

export default useAddTransaction;
