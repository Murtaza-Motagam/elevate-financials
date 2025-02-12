import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import { dateTimeDisplay } from '@/lib/common';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any;
}

const useTransaction = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionList, setTransactionList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trData, setTrData] = useState<any>({});

  const getTransactions = async () => {
    try {
      const response = await apiRequest<apiRequestProps>({
        url: endpoints.getTransaction,
        method: 'get',
      });
      setTransactionList(response?.transactions || []);
      setLoading(false);
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const invoices = transactionList.map((transaction: any) => ({
    transactionId: transaction.transactionId,
    accountNumber: transaction.receiverAccNum.toString(),
    paymentMethod: transaction.transactionType || 'N/A',
    totalAmount: transaction.amt,
    paymentStatus: transaction.status,
    deviceInfo: `${transaction.deviceInfo?.substring(0, 10)}...`,
    transactionDate: dateTimeDisplay(transaction.transactionDate),
    remarks: `${transaction.remarks?.substring(0, 20)}...`,
    ...transaction,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTransactionDetails = (details: any, setOpen: any) => {
    setTrData(details);
    setOpen(true);
  };

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
        return <span className={commonClass}>{paymentMethod}</span>;
    }
  };

  // Columns of headers

  const columns = [
    { header: 'ID', accessor: 'transactionId' },
    { header: 'A/C Number', accessor: 'accountNumber' },
    { header: 'Payment Method', accessor: 'paymentMethod' },
    { header: 'Amount', accessor: 'totalAmount' },
    {
      header: 'Device',
      accessor: 'deviceInfo',
      render: (value: string) => (value?.length > 20 ? `${value.substring(0, 20)}...` : value),
    },
    {
      header: 'Date',
      accessor: 'transactionDate',
      render: (value: Date) => dateTimeDisplay(value),
    },
    {
      header: 'Status',
      accessor: 'paymentStatus',
      render: (value: string) => getPaymentMethod(value),
    },
    { header: 'Remarks', accessor: 'remarks' },
  ];

  useEffect(() => {
    getTransactions();
  }, []);

  return {
    transactionList,
    invoices,
    handleTransactionDetails,
    trData,
    columns,
    loading,
    getTransactions,
  };
};

export default useTransaction;
