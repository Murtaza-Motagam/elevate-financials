import { showToast } from '@/lib/common';
import { KEYS } from '@/lib/constant';
import { LocalStorage } from '@/lib/localStorage';
import { authenticationRoutes } from '@/lib/routes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useHeader = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const [isUser, setIsUser] = useState<boolean>();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const states = { loading, user, isUser };

  const logout = async () => {
    Cookies.remove('Authorization-token');
    await axios.delete('/api/user');
    LocalStorage.remove(KEYS.authDetails);
    router.push(authenticationRoutes.login);
    showToast('You have successfully logged out. See you again soon!');
  };

  const getUser = async () => {
    try {
      const response = await axios.get('/api/user');

      if (response.data?.token) {
        setIsUser(true);
        setUser(response.data.data || '');
      } else {
        setIsUser(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.warn('User is not authenticated.');
      } else {
        console.error('API error: ', error);
      }
      setIsUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    router,
    pathname,
    theme,
    states,
    logout,
  };
};

export default useHeader;
