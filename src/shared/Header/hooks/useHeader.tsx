import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";

const useHeader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [isUser, setIsUser] = useState<boolean>();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const states = {loading, user, isUser };

  return {
    router,
    pathname,
    theme,
    states
  }
}

export default useHeader
