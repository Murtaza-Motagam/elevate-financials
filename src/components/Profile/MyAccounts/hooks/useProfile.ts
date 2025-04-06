import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import { useState } from 'react';

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  qrImage?: any;
}

const useProfile = () => {
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const [qrImage, setQrImage] = useState<string>('');

  const generateQr = async () => {
    setQrLoading(true);
    try {
      const response = await apiRequest<apiRequestProps>({
        url: endpoints.generateQr,
        method: 'get',
      });
      setQrImage(response.qrImage);
    } catch (error) {
      console.error(error);
    } finally {
      setQrLoading(false);
    }
  };

  const handleQrGenerator = async () => {
    setQrOpen(true);
    await generateQr();
  };

  return {
    qrOpen,
    setQrOpen,
    generateQr,
    qrLoading,
    qrImage,
    handleQrGenerator,
  };
};

export default useProfile;
