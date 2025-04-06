'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { authenticationRoutes } from '@/lib/routes';

interface UserContextProps {
  mainUser: UserFieldProps | null;
  setMainUser: React.Dispatch<React.SetStateAction<UserFieldProps | null>>;
  contextLoading: boolean;
  fetchUser: () => void;
}

interface UserFieldProps {
  id?: number | null;
  profileImg?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  username?: string | null;
  mobNo?: string | null;
  status?: string | null;
  email?: string | null;
  role?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accountDetails?: any | null;
}

const UserContext = createContext<UserContextProps>({
  mainUser: null,
  setMainUser: () => {},
  contextLoading: true,
  fetchUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [mainUser, setMainUser] = useState<UserFieldProps | null>(null);
  const [contextLoading, setContextLoading] = useState(true);
  const pathname = usePathname();
  const authenticatedRoutes = [
    authenticationRoutes.register,
    authenticationRoutes.login,
    authenticationRoutes.otp,
    authenticationRoutes.forgotPassword,
  ];

  // Fetch user data from session API
  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user');
      if (response.data?.token) {
        setMainUser(response.data.data || '');
      }
      setContextLoading(false);
    } catch (error) {
      console.warn(error);
      setMainUser(null);
      setContextLoading(false);
    }
  };

  useEffect(() => {
    if (!authenticatedRoutes.includes(pathname)) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <UserContext.Provider value={{ mainUser, setMainUser, contextLoading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
