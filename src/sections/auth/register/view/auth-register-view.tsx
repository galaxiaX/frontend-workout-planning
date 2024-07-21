'use client';

import toast from 'react-hot-toast';
import { useAuthContext } from '@/auth/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { PATH_AFTER_LOGIN } from '@/config-global';
import Link from 'next/link';
import { paths } from '@/routes/path';
import { useState } from 'react';

const AuthRegisterView = () => {
  const { register, authenticated } = useAuthContext();

  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test');
  const [confirmPassword, setConfirmPassword] = useState('test');

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error('Password do not match');
        return;
      }

      await register?.(email, password);

      toast.success('Register successful');

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || 'An error occurred. Please try again'
      );
    }
  };

  if (authenticated) {
    router.push(returnTo || PATH_AFTER_LOGIN);
  }

  return (
    <main className='flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-gray-200 p-8'>
      <section className='h-fit w-full max-w-2xl rounded-xl bg-white/75 px-4 py-16 drop-shadow-lg'>
        <div className='flex h-full flex-col items-center space-y-4 px-4'>
          <h1 className='text-3xl font-bold text-gray-800'>Register</h1>

          <form
            onSubmit={handleSubmit}
            className='mx-auto flex w-full max-w-lg flex-col space-y-4'
          >
            <div className='flex w-full flex-col space-y-2'>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                placeholder='Email'
              />
            </div>
            <div className='flex w-full flex-col space-y-2'>
              <label
                htmlFor='password'
                className='text-sm font-semibold text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                placeholder='Password'
              />
            </div>

            <div className='flex w-full flex-col space-y-2'>
              <label
                htmlFor='password'
                className='text-sm font-semibold text-gray-700'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirm-password'
                name='confirm-password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                placeholder='Confirm Password'
              />
            </div>

            <button
              type='submit'
              disabled={
                !email.trim() || !password.trim() || !confirmPassword.trim()
              }
              className='w-full rounded-md bg-blue-500 p-2 text-white duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 disabled:bg-gray-300'
            >
              Register
            </button>

            <div className='mx-auto w-fit'>
              Already have an account?{' '}
              <Link href={paths.auth.login} className='text-blue-600'>
                Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AuthRegisterView;
