import React from 'react';
import usePersonalDetails from '../hooks/usePersonalDetails';
import InputField from '@/widgets/Input';
import DatePicker from '@/widgets/DatePicker';
import SingleSelect from '@/widgets/SingleSelect';
import { genderOptions } from '@/lib/constant';
import DefaultButton from '@/widgets/DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';
import { getYear } from 'date-fns';

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
        label='First name'
        rest={hookform.register('firstName')}
        placeholder='Enter your first name'
        type='text'
        error={hookform.errors?.firstName?.message}
        mandatory
      />
      <InputField
        label='Last name'
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
          label='Mobile number'
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
        label='Date of birth'
        control={hookform.control}
        placeholder='Select date of birth'
        error={hookform.errors?.dob?.message}
        endYear={getYear(new Date()) - 18}
        mandatory
      />
      <div className='md:col-span-2 w-full flex items-center justify-center mt-3'>
        <DefaultButton
          icon={loading && <RollLoader />}
          type='submit'
          title={!loading ? 'Submit' : 'Please wait...'}
          className='text-center w-[300px] rounded-[5px]'
          loading={loading}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default PersonalDetails;
