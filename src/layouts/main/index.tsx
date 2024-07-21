'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from './header';
import Navbar from './navbar';
import { useAuthContext } from '@/auth/hooks';
import { paths } from '@/routes/path';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { authenticated, loading } = useAuthContext();

  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname
      }).toString();

      router.replace(paths.auth.login + '?' + searchParams);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    if (!loading) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className='flex h-[100dvh] flex-col'>
      {authenticated && (
        <>
          <Header />

          <div className='flex h-[calc(100dvh-56px)] grow overflow-hidden lg:h-[calc(100dvh-80px)]'>
            <Navbar />
            <main
              id='scrollableContainer'
              className='h-full grow overflow-y-auto overflow-x-hidden'
            >
              <div className='flex h-fit min-h-[calc(100dvh-56px)] flex-col bg-gray-200 lg:min-h-[calc(100dvh-80px)]'>
                {checked && children}
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
