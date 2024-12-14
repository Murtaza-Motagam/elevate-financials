import { accountTypeOptions } from '@/lib/constant';
import InputField from '@/widgets/Input';
import PasswordInput from '@/widgets/PasswordInput';
import SingleSelect from '@/widgets/SingleSelect';
import React from 'react'
import useBankingDetails from '../hooks/useBankingDetails';
import DefaultButton from '@/widgets/DefaultButton';
import { PulseLoader } from 'react-spinners';

const BankingDetails: React.FC = () => {
    const { hookform, onSubmitBankingDetails, loading } = useBankingDetails();
    return (
        <form onSubmit={hookform.handleSubmit(onSubmitBankingDetails)} className='grid grid-cols-1 gap-5'>
            <SingleSelect
                name="accountType"
                control={hookform.control}
                label="Account Type"
                placeholder="Select your account type"
                options={accountTypeOptions}
                dropdownClasses='md:w-[330px]'
                error={hookform.errors.accountType?.message}
                mandatory
            />
            <InputField
                label='Username'
                rest={hookform.register('username')}
                placeholder='Create a username'
                type='text'
                error={hookform.errors?.username?.message}
                mandatory
            />
            <PasswordInput
                label='Password'
                rest={hookform.register('password')}
                placeholder='Create a strong password'
                error={hookform.errors?.password?.message}
                mandatory
            />
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
                className='text-center'
            />
        </form>
    )
}

export default BankingDetails