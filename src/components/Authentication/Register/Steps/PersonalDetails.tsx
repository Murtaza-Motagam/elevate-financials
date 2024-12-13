import React from 'react'
import usePersonalDetails from '../hooks/usePersonalDetails';
import InputField from '@/widgets/Input';
import DatePicker from '@/widgets/DatePicker';
import SingleSelect from '@/widgets/SingleSelect';
import { genderOptions } from '@/lib/constant';
import DefaultButton from '@/widgets/DefaultButton';
import { PulseLoader } from 'react-spinners';

interface PersonalDetailsProps {
    activeStep: number;
    onNext: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ activeStep, onNext }) => {

    const { hookform, onSubmitPersonalDetails, loading } = usePersonalDetails({ onNext, activeStep });

    return (
        <form onSubmit={hookform.handleSubmit(onSubmitPersonalDetails)} className='grid grid-cols-1 md:grid-cols-2 w-full gap-5'>
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
            <InputField
                label='Email'
                rest={hookform.register('email')}
                placeholder='Enter your email'
                type='email'
                error={hookform.errors?.email?.message}
                mandatory
            />
            <DatePicker
                name="dob"
                label='Date of Birth'
                control={hookform.control}
                placeholder="Select Date of Birth"
                error={hookform.errors?.dob?.message}
                mandatory
            />
            <InputField
                label='Mobile Number'
                rest={hookform.register('mobNo')}
                placeholder='Enter your mobile number'
                type='number'
                error={hookform.errors?.mobNo?.message}
                mandatory
            />
            <SingleSelect
                name="genderNm"
                control={hookform.control}
                label="Gender"
                placeholder="Select your gender"
                options={genderOptions}
                dropdownClasses='w-[330px]'
                error={hookform.errors.genderNm?.message}
            />
            <div className="md:col-span-2 w-full flex items-center justify-center mt-3">
                <DefaultButton
                    icon={
                        loading &&
                        <PulseLoader
                            color="#ffffff"
                            size={10}
                        />
                    }
                    type='submit'
                    title={!loading ? 'Submit' : ''}
                    className='text-center w-[300px]'
                />
            </div>
        </form>
    )
}

export default PersonalDetails
