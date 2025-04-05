const cookieOptions = {
  cookieName: 'ef-user',
  password: 'efUser-efUser-efUser-efUser',
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? true : false,
  },
};

export default cookieOptions;
