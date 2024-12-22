import { dateTimeDisplay } from '@/lib/common';
import { backendUrl, token } from '@/lib/constant';
import axios from 'axios';
import { useEffect, useState } from 'react'

const useTransaction = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [transactionList, setTransactionList] = useState<any>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [trData, setTrData] = useState<any>({});

    const getTransactions = async () => {
        const response = await axios({
            url: `${backendUrl}/transactions/get-transaction`,
            method: 'get',
            headers: {
                Authorization: token
            }
        });
        const resData = response.data;
        setTransactionList(resData?.transactions);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoices = transactionList.map((transaction: any) => ({
        transactionId: transaction.transactionId,
        accountNumber: transaction.receiverAccNum.toString(),
        paymentMethod: transaction.transactionType || "N/A",
        totalAmount: transaction.amt,
        paymentStatus: transaction.status,
        deviceInfo: transaction.deviceInfo,
        transactionDate: dateTimeDisplay(transaction.transactionDate),
        remarks: `${transaction.remarks?.substring(0, 20)}...`,
        ...transaction,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTransactionDetails = (details: any, setOpen: any) => {
        setTrData(details);
        setOpen(true);
    }


    useEffect(() => {
        getTransactions();
    }, [])


    return {
        transactionList,
        invoices,
        handleTransactionDetails,
        trData
    }
}

export default useTransaction
