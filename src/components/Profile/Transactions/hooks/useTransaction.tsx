import { dateTimeDisplay } from '@/lib/common';
import { backendUrl, token } from '@/lib/constant';
import axios from 'axios';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const useTransaction = () => {
  const [transactionList, setTransactionList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [trData, setTrData] = useState<any>({});

  const getTransactions = async () => {
    try {
      const response = await axios({
        url: `${backendUrl}/transactions/get-transaction`,
        method: 'get',
        headers: {
          Authorization: token
        }
      });
      const resData = response.data;
      setTransactionList(resData?.transactions || []);
      setLoading(false);
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setLoading(false);
    }
  }

  const invoices = transactionList.map((transaction: any) => ({
    transactionId: transaction.transactionId,
    accountNumber: transaction.receiverAccNum.toString(),
    paymentMethod: transaction.transactionType || "N/A",
    totalAmount: transaction.amt,
    paymentStatus: transaction.status,
    deviceInfo: `${transaction.deviceInfo?.substring(0, 10)}...`,
    transactionDate: dateTimeDisplay(transaction.transactionDate),
    remarks: `${transaction.remarks?.substring(0, 20)}...`,
    ...transaction,
  }));

  const handleTransactionDetails = (details: any, setOpen: any) => {
    setTrData(details);
    setOpen(true);
  }

  const getPaymentMethod = (paymentMethod: string | undefined) => {
    const commonClass = 'font-bold uppercase flex items-center gap-x-1';
    switch (paymentMethod) {
      case 'Success':
        return (
          <span className={`text-green-500 ${commonClass}`}>
            <CircleCheck size={15} /> {paymentMethod}
          </span>
        );
      case 'Pending':
        return (
          <span className={`text-yellow-500 ${commonClass}`}>
            <CircleAlert size={15} /> {paymentMethod}
          </span>
        );
      case 'Failed':
        return (
          <span className={`text-red-600 ${commonClass}`}>
            <CircleX size={15} /> {paymentMethod}
          </span>
        );
      default:
        return (
          <span className={commonClass}>{paymentMethod}</span>
        );
    }
  };

  // Columns of headers

  const columns = [
    { header: 'ID', accessor: 'transactionId' },
    { header: 'A/C Number', accessor: 'accountNumber' },
    { header: 'Payment Method', accessor: 'paymentMethod' },
    { header: 'Amount', accessor: 'totalAmount' },
    { header: 'Device', accessor: 'deviceInfo', render: (value: string) => value?.length > 20 ? `${value.substring(0, 20)}...` : value },
    { header: 'Date', accessor: 'transactionDate', render: (value: Date) => dateTimeDisplay(value) },
    { header: 'Status', accessor: 'paymentStatus', render: (value: string) => getPaymentMethod(value) },
    { header: 'Remarks', accessor: 'remarks' },
  ];

  useEffect(() => {
    getTransactions();
  }, [])


  return {
    transactionList,
    invoices,
    handleTransactionDetails,
    trData,
    columns,
    loading,
    getTransactions,
  }
}

export default useTransaction
