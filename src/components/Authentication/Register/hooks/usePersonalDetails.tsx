import { personalDetails } from "@/schema/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface usePersonalDetailProps {
    onNext: () => void;
    activeStep: number;
}

interface personalDetailFieldProps {
    firstName: string;
    lastName: string;
    genderNm: string,
    dob: Date,
    mobNo: string,
    email: string,
}

const usePersonalDetails = ({ onNext = () => { }, activeStep }: usePersonalDetailProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { register, reset, control, watch, handleSubmit, formState: { errors } } = useForm<personalDetailFieldProps>({
        resolver: yupResolver(personalDetails)
    });

    const onSubmitPersonalDetails = async (data: personalDetailFieldProps) => {
        setLoading(true)
        console.log(data, activeStep);
        onNext();
        setLoading(false)
    }


    const hookform = { register, reset, handleSubmit, errors, control, watch };
    return {
        hookform,
        onSubmitPersonalDetails,
        loading,
    }
}

export default usePersonalDetails
