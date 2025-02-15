import { useUser } from '@/context/UserContext';
import { logout } from '@/lib/common';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const useHeader = () => {
  const [isUser, setIsUser] = useState<boolean>();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { mainUser, contextLoading } = useUser();

  const states = { mainUser, isUser, contextLoading };

  useEffect(() => {
    if (!contextLoading) {
      setIsUser(!isEmpty(mainUser));
    }
  }, [mainUser, contextLoading]);

  return {
    router,
    pathname,
    theme,
    states,
    logout,
  };
};

export default useHeader;
