export const endpoints = {
  // authentication
  savePersonalDetails: '/auth/save-personal-details',
  saveDocumentDetails: '/auth/save-document-details',
  saveBankingDetails: '/auth/save-banking-details',
  login: '/auth/login',
  verifyOtp: '/auth/verify-otp',

  // other routes
  getUser: '/user/get-user',
  getTransaction: '/transactions/get-transaction',
  createTransaction: '/transactions/create-transaction',
  updateProfile: '/user/update-profile',
  getAnalytics: '/user/get-analytics',
};
