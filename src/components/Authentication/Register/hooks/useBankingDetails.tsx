import { showToast } from "@/lib/common";
import { backendUrl, KEYS } from "@/lib/constant";
import { LocalStorage } from "@/lib/localStorage";
import { bankingDetails } from "@/schema/register";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { publicRoutes } from "@/lib/routes";

interface useBankingProps {
    accountType: string;
    username: string;
    password: string;
}

const useBankingDetails = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { register, reset, control, watch, setError, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<useBankingProps>({
        resolver: yupResolver(bankingDetails)
    });

    const onSubmitBankingDetails = async (data: useBankingProps) => {
        setLoading(true);
        const getPersonalData = LocalStorage.getJSON(KEYS.personalDetails);
        const payload = {
            email: getPersonalData?.email,
            accountDetails: {
                accountType: data?.accountType,
                username: data?.username,
                password: data?.password,
            }
        }
        try {
            const url = `${backendUrl}/auth/save-banking-details`;
            const response = await axios({
                url,
                data: payload,
                method: 'post'
            });
            const resData = response.data;
            if (resData?.success) {
                const LocalData = {
                    token: resData?.authtoken,
                }
                Cookies.set('Authorization-token', resData.authtoken, { expires: 7, secure: true });
                LocalStorage.setJSON(KEYS.authDetails, LocalData);
                showToast(resData?.message, 'success');
                LocalStorage.remove(KEYS.personalDetails)
                LocalStorage.remove(KEYS.documentDetails)
                router.push(publicRoutes.bankingDetail);
            }
            else {
                showToast(resData?.message, 'error')
            }
        } catch (err) {
            console.error('error: ', err);
            showToast('Some error has occurred. Please wait for some time', 'error')
        }
    }


    const hookform = { register, reset, handleSubmit, errors, setError, setValue, clearErrors, control, watch };
    return {
        hookform,
        onSubmitBankingDetails,
        loading,
    }
}

export default useBankingDetails
