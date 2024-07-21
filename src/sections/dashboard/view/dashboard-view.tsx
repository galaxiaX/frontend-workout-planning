'use client';

import { useAuthContext } from '@/auth/hooks';
import MainLayout from '@/layouts/main';
import { paths } from '@/routes/path';
import { getPlans } from '@/services/plan';
import { IPlan } from '@/types/plan';
import { randomPastelColor } from '@/utils/random-pastel-color';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DashboardView = () => {
  const { authenticated } = useAuthContext();

  const router = useRouter();

  const [plans, setPlans] = useState<IPlan[]>([]);

  const handleGetPlans = async () => {
    try {
      const res = await getPlans();

      if (res) {
        setPlans(res);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || 'An error occurred. Please try again'
      );
    }
  };

  useEffect(() => {
    if (authenticated) {
      handleGetPlans();
    }
  }, [authenticated]);

  useEffect(() => {
    const notFirstTime = localStorage.getItem('notFirstTime');
    if (!notFirstTime) {
      localStorage.setItem('notFirstTime', 'true');
      router.push(paths.dashboard.plan.new);
    }
  }, [router]);

  return (
    <MainLayout>
      <section className='mx-auto my-4 flex h-full w-full max-w-[1000px] flex-col gap-8 rounded-xl bg-white px-8 py-6 drop-shadow-[0_0_4px_#1010102f] lg:my-8 lg:px-16 lg:py-12'>
        <header className='shrink-0'>
          <h1 className='text-3xl font-semibold'>Dashboard</h1>
        </header>

        <div className='flex w-full flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>Plans</h2>

            <Link
              href={paths.dashboard.plan.new}
              className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white'
            >
              <span>Create new plan</span>
            </Link>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {plans.length === 0 && <p>No plans found</p>}

            {plans.map(plan => (
              <Link
                key={plan._id}
                href={paths.dashboard.plan.details(plan?._id)}
                style={{ backgroundColor: randomPastelColor() }}
                className='flex flex-col gap-2 rounded-lg px-8 py-4 drop-shadow-md'
              >
                <p className='line-clamp-1 font-medium'>{plan.planName}</p>

                <div className='text-sm'>
                  <p className='font-medium'>Created at: </p>
                  {dayjs(plan.createdAt).format('DD/MM/YYYY HH:mm')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DashboardView;
