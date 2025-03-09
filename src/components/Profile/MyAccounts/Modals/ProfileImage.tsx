import React, { SetStateAction } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import LazyLoadImg from '@/widgets/LazyLoadImg';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ProfileImgProps {
  open: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInfo?: any;
}
const ProfileImage: React.FC<ProfileImgProps> = ({ open, setOpen = () => {}, userInfo }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Hidden Dialog Title</DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <DialogDescription>Hidden Dialog Title</DialogDescription>
      </VisuallyHidden>
      <DialogContent>
        {userInfo?.documentDetails?.profileImg && (
          <LazyLoadImg
            src={userInfo?.documentDetails?.profileImg}
            className='mt-2 w-full h-full object-contain'
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImage;
