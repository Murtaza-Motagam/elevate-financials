'use client';

import Preloader from '@/widgets/loaders/Preloader';
import { useEffect, useState } from 'react';

const PreloaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <Preloader /> : children;
};

export default PreloaderWrapper;
