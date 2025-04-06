import React, { SetStateAction } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import BasicLoader from '@/widgets/loaders/BasicLoader';

interface ProfileImgProps {
  open: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData?: any;
}

const ProfileQr: React.FC<ProfileImgProps> = ({ open, setOpen = () => {}, profileData }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Hidden Dialog Title</DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <DialogDescription>Hidden Dialog Title</DialogDescription>
      </VisuallyHidden>
      <DialogContent className='border border-gray-700 rounded-2xl shadow-xl p-6 w-[370px] sm:w-[420px]'>
        <h2 className='text-2xl mt-2 font-semibold text-center mb-1'>Scan QR code</h2>
        <div className='bg-transparent mx-auto w-fit'>
          {profileData.qrLoading ? (
            <BasicLoader />
          ) : (
            <LazyLoadImg
              className='w-72 h-72 object-contain rounded-lg'
              src={profileData?.qrImage}
              alt='QR Code'
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileQr;
