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

  return {
    barChartData,
    pieChartData,
    bankingRadialData,
    lineChartData,
  };
};

export default useDashboard;
