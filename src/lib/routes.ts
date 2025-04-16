export const publicRoutes = {
  home: '/',
  bankingDetail: '/banking-details',
  privacyPolicy: '/privacy-policy',
  helpCenter: '/help-center',
  terms: '/terms',
  services: '/services',
};

export const protectedRoutes = {
  profile: '/profile',
  services: '/services',
  oneTimeTransfer: '/services/onetimetransfer',
  qrPay: '/services/qrpay',
};

export const profile_routes = {
  dashboard: '/profile?tab=0',
  MyAccounts: '/profile?tab=1',
  transaction: '/profile?tab=2',
};

export const authenticationRoutes = {
  register: '/register',
  login: '/login',
  otp: '/otp',
  forgotPassword: '/forgot-password',
};
