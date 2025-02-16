import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import React, { SetStateAction } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import InputField from '@/widgets/Input';
import DefaultButton from '@/widgets/DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';
import Uploader from '@/widgets/Uploader';
import SingleSelect from '@/widgets/SingleSelect';
import { accountTypeOptions } from '@/lib/constant';
import useEditProfile from '../hooks/useEditProfile';

interface EditProfileProps {
  open: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  fetchUserInfo?: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  open,
  setOpen = () => { },
  fetchUserInfo = () => { },
}) => {
  const closeModal = () => {
    setOpen(false);
  };

  const { hookform, loading, onSubmit } = useEditProfile({ open, closeModal, fetchUserInfo });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Hidden Dialog Title</DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <DialogDescription>Hidden Dialog Title</DialogDescription>
      </VisuallyHidden>
      <DialogContent>
        <h1 className='text-2xl font-semibold dark:text-gray-200'>Edit profile</h1>
        <div className='mt-3 grid grid-cols-1 gap-3'>
          <Uploader
            name='profileImg'
            img={hookform.watch('profileImg') || null}
            setImg={(url = '') => hookform.setValue('profileImg', url || '')}
            clearErrors={hookform.clearErrors}
            setError={hookform.setError}
            label='Upload Profile Image'
          />
          <InputField
            label='Username'
            rest={hookform.register('username')}
            placeholder='create your username'
          />
          <InputField
            label='Email'
            rest={hookform.register('email')}
            placeholder='Enter your email address'
            error={hookform.errors.email?.message}
            disabled={true}
          />
          <SingleSelect
            name='accountType'
            control={hookform.control}
            label='Account type'
            placeholder='Select your account type'
            options={accountTypeOptions}
            dropdownClasses='md:w-[330px]'
          />
          <div className='w-full flex justify-end items-center gap-x-2'>
            <DefaultButton title='Cancel' variant='outline' onClick={closeModal} />
            <DefaultButton
              icon={loading && <RollLoader />}
              type='submit'
              title={!loading ? 'Update' : 'Processing'}
              onClick={hookform.handleSubmit(onSubmit)}
              loading={loading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
