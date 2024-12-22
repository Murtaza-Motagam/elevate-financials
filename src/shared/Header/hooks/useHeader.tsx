import { isAuthenticated, showToast } from "@/lib/common";
import { backendUrl, KEYS } from "@/lib/constant";
import { LocalStorage } from "@/lib/localStorage";
import { authenticationRoutes } from "@/lib/routes";
import axios from "axios";
import Cookies from 'js-cookie';
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const useHeader = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const [isUser, setIsUser] = useState<boolean>();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const url = `${backendUrl}/user/get-user`;
  const checkForModule = LocalStorage.getJSON('authDetails');

  const states = { loading, user, isUser };

  const logout = () => {
    Cookies.remove('Authorization-token');
    LocalStorage.remove(KEYS.authDetails);
    router.push(authenticationRoutes.login);
    showToast('You have successfully logged out. See you again soon!');
  };

  useEffect(() => {
    const getUser = async () => {
      const authenticated = isAuthenticated();
      if (authenticated) {
        setIsUser(authenticated)
        const response = await axios({
          url,
          method: 'get',
          headers: {
            Authorization: checkForModule?.token
          }
        });
        const resData = response.data;
        setUser(resData?.details || '');
      } else {
        setIsUser(false);
      }
      setLoading(false);
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    router,
    pathname,
    theme,
    states,
    logout
  }
}

export default useHeader
