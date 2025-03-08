const useDashboard = () => {
  const barChartData = [
    { name: 'Jan', revenue: 12000, transactions: 800 },
    { name: 'Feb', revenue: 15000, transactions: 950 },
    { name: 'Mar', revenue: 18000, transactions: 1100 },
    { name: 'Apr', revenue: 17000, transactions: 1050 },
    { name: 'May', revenue: 19000, transactions: 1200 },
    { name: 'June', revenue: 21000, transactions: 1300 },
    { name: 'July', revenue: 25000, transactions: 1450 },
    { name: 'Aug', revenue: 24000, transactions: 1400 },
    { name: 'Sep', revenue: 23000, transactions: 1350 },
    { name: 'Oct', revenue: 22000, transactions: 1300 },
    { name: 'Nov', revenue: 20000, transactions: 1250 },
    { name: 'Dec', revenue: 27000, transactions: 1600 },
  ];

  const pieChartData = [
    { name: 'Savings', value: 35 },
    { name: 'Current', value: 25 },
    { name: 'Fixed Deposit', value: 20 },
  ];

  return {
    barChartData,
    pieChartData,
  };
};

export default useDashboard;
