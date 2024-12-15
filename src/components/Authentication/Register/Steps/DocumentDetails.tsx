import React from 'react'
import useDocumentDetails from '../hooks/useDocumentDetails';
import InputField from '@/widgets/Input';
import Uploader from '@/widgets/Uploader';
import SingleSelect from '@/widgets/SingleSelect';
import { addressProofOptions } from '@/lib/constant';
import DefaultButton from '@/widgets/DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';

interface DocumentDetailsProps {
    onNext?: () => void;
}


const DocumentDetails: React.FC<DocumentDetailsProps> = ({ onNext = () => { } }) => {
    const { hookform, onSubmitDocumentDetails, loading } = useDocumentDetails({ onNext });

    return (
        <form onSubmit={hookform.handleSubmit(onSubmitDocumentDetails)} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <InputField
                label='Aadhar number'
                rest={hookform.register('aadharNo')}
                placeholder='Enter your aadhar card number'
                type='number'
                error={hookform.errors?.aadharNo?.message}
                mandatory
            />
            <InputField
                label='Pancard number'
                rest={hookform.register('panNo')}
                placeholder='Enter your pancard number'
                type='text'
                error={hookform.errors?.panNo?.message}
                mandatory
            />
            <div className="md:col-span-2">
                <InputField
                    label='Driving Licence'
                    rest={hookform.register('driverLicence')}
                    placeholder='Enter your driving licence number'
                    type='number'
                />
            </div>
            <div className="md:col-span-2">
                <SingleSelect
                    name="addressProofType"
                    control={hookform.control}
                    label="Address Proof Type"
                    placeholder="Select your address proof type"
                    options={addressProofOptions}
                    dropdownClasses='md:w-[330px]'
                    error={hookform.errors.addressProofType?.message}
                />
            </div>
            <Uploader
                name="profileImg"
                img={hookform.watch('profileImg') || null}
                setImg={(url = '') => hookform.setValue('profileImg', url || '')}
                clearErrors={hookform.clearErrors}
                setError={hookform.setError}
                label="Upload Profile Image"
            />
            {hookform.watch('addressProofType') && (
                <Uploader
                    name="addressProofImg"
                    img={hookform.watch('addressProofImg') || null}
                    setImg={(url) => hookform.setValue('addressProofImg', url || '')}
                    clearErrors={hookform.clearErrors}
                    setError={hookform.setError}
                    label="Upload address document"
                    mandatory
                />
            )}
            <div className="md:col-span-2 w-full flex items-center justify-center mt-3">
                <DefaultButton
                    icon={
                        loading &&
                        <RollLoader />
                    }
                    type='submit'
                    title={!loading ? 'Submit' : 'Processing'}
                    className='text-center w-[300px] rounded-[5px]'
                    loading={loading}
                />
            </div>
        </form>
    )
}

export default DocumentDetails
