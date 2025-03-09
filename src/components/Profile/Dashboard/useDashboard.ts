import apiRequest from '@/lib/api';
import { endpoints } from '@/lib/apiEndpoint';
import { useEffect, useState } from 'react';

interface apiRequestProps {
  url: string;
  method: string;
  success: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface transactionHistoryType {
  name?: string;
  totalBalance?: number;
  totalAmount?: number;
}
export interface latestTransactionType {
  name?: string;
  amt?: number;
  accountType?: string;
  profileImg: string;
}

const useDashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analyticsData, setAnalyticsData] = useState<any>({});

  const lineChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 500 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1000 },
    { name: 'Aug', value: 750 },
    { name: 'Sep', value: 850 },
    { name: 'Oct', value: 950 },
    { name: 'Nov', value: 650 },
    { name: 'Dec', value: 1100 },
  ];

  const bankingRadialData = [
    { name: 'Savings', value: 65, color: '#3498db' },
    { name: 'Loans', value: 45, color: '#e74c3c' },
    { name: 'Investments', value: 80, color: '#f1c40f' },
    { name: 'Credit', value: 55, color: '#2ecc71' },
  ];

  const getAnalytics = async () => {
    try {
      const response = await apiRequest<apiRequestProps>({
        url: endpoints.getAnalytics,
        method: 'get',
      });
      const resData = response.data;
      const totalRevenue = resData.transactionHistory
        .filter((data: transactionHistoryType) => data.totalBalance !== 0)
        .map((val: transactionHistoryType) => ({
          totalBalance: val.totalBalance,
        }));
      resData.totalRevenue = totalRevenue;
      console.log('resData: ', resData);
      setAnalyticsData(resData);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return {
    bankingRadialData,
    lineChartData,
    analyticsData,
    loading,
  };
};

export default useDashboard;
