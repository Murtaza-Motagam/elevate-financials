import React from 'react';
import usePersonalDetails from '../hooks/usePersonalDetails';
import InputField from '@/widgets/Input';
import DatePicker from '@/widgets/DatePicker';
import SingleSelect from '@/widgets/SingleSelect';
import { genderOptions } from '@/lib/constant';
import DefaultButton from '@/widgets/DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';

interface PersonalDetailsProps {
  onNext: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ onNext }) => {
  const { hookform, onSubmitPersonalDetails, loading } = usePersonalDetails({ onNext });

  return (
    <form
      onSubmit={hookform.handleSubmit(onSubmitPersonalDetails)}
      className='grid grid-cols-1 md:grid-cols-2 gap-5'
    >
      <InputField
        label='First Name'
        rest={hookform.register('firstName')}
        placeholder='Enter your first name'
        type='text'
        error={hookform.errors?.firstName?.message}
        mandatory
      />
      <InputField
        label='Last Name'
        rest={hookform.register('lastName')}
        placeholder='Enter your last name'
        type='text'
        error={hookform.errors?.lastName?.message}
        mandatory
      />
      <div className='md:col-span-2'>
        <InputField
          label='Email'
          rest={hookform.register('email')}
          placeholder='Enter your email'
          type='email'
          error={hookform.errors?.email?.message}
          mandatory
        />
      </div>
      <div className='md:col-span-2'>
        <InputField
          label='Mobile Number'
          rest={hookform.register('mobNo')}
          placeholder='Enter your mobile number'
          type='number'
          error={hookform.errors?.mobNo?.message}
          mandatory
        />
      </div>
      <SingleSelect
        name='genderNm'
        control={hookform.control}
        label='Gender'
        placeholder='Select your gender'
        options={genderOptions}
        dropdownClasses='md:w-[330px]'
        error={hookform.errors.genderNm?.message}
      />
      <DatePicker
        name='dob'
        label='Date of Birth'
        control={hookform.control}
        placeholder='Select Date of Birth'
        error={hookform.errors?.dob?.message}
        mandatory
      />
      <div className='md:col-span-2 w-full flex items-center justify-center mt-3'>
        <DefaultButton
          icon={loading && <RollLoader />}
          type='submit'
          title={!loading ? 'Submit' : 'Processing'}
          className='text-center w-[300px] rounded-[5px]'
          loading={loading}
        />
      </div>
    </form>
  );
};

export default PersonalDetails;
