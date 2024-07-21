'use client';

import { paths } from '@/routes/path';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.push(paths.dashboard.root);
    }
  }, [router]);
  return null;
};

export default Home;
