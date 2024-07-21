import { RegisterView } from '@/sections/auth/register/view';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Register page'
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterView />
    </Suspense>
  );
};

export default LoginPage;
