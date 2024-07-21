'use client';

import MainLayout from '@/layouts/main';
import { paths } from '@/routes/path';
import { deletePlan } from '@/services/plan';
import { IPlan } from '@/types/plan';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  planDetails: IPlan;
};

const DashboardPlanDetailsView = ({ planDetails }: Props) => {
  const router = useRouter();

  const handleDeletePlan = async () => {
    try {
      await deletePlan(planDetails._id);
      toast.success('Plan deleted successfully');
      router.push(paths.dashboard.root);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || 'An error occurred. Please try again'
      );
    }
  };

  return (
    <MainLayout>
      <section className='mx-auto my-4 flex h-full w-full max-w-[1000px] flex-col gap-8 rounded-xl bg-white px-8 py-6 drop-shadow-[0_0_4px_#1010102f] lg:my-8 lg:px-16 lg:py-12'>
        <header className='shrink-0'>
          <h1 className='text-3xl font-semibold'>Plan Details</h1>
        </header>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            <p className='text-xl font-medium'>
              Plan name: {planDetails?.planName}
            </p>

            <p className='text-sm'>
              <span className='font-medium'>Created at: </span>
              {dayjs(planDetails?.createdAt).format('DD/MM/YYYY HH:mm')}
            </p>
            <div className='flex flex-col gap-1'>
              <p className='text-lg font-medium'>Information</p>
              <p>
                <span className='font-medium'>height: </span>
                {planDetails?.height}
              </p>

              <p>
                <span className='font-medium'>weight: </span>
                {planDetails?.weight}
              </p>

              <p>
                <span className='font-medium'>weekly activities: </span>
                {planDetails?.weeklyActivities.join(', ')}
              </p>

              <p>
                <span className='font-medium'>workout goal: </span>
                {planDetails?.workoutGoal}
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            {planDetails?.workoutPlan?.map((plan, index) => (
              <div key={index} className='flex flex-col gap-4'>
                {plan?.type === 'plan' && (
                  <div className='flex flex-col gap-2'>
                    <span className='text-lg font-semibold'>
                      {plan?.title && plan?.title + ':'}
                    </span>
                    {Array.isArray(plan?.content) &&
                      plan?.content.map((day, index) => (
                        <div key={index} className='indent-4'>
                          <span className='text-lg font-medium'>
                            -{' '}
                            {day?.day?.startsWith('Day')
                              ? day?.day + ': '
                              : day?.day}
                          </span>
                          <span>{day?.exercises}</span>
                        </div>
                      ))}
                  </div>
                )}

                {plan?.type === 'note' && (
                  <div>
                    <span className='text-lg font-semibold'>
                      {plan?.title}:{' '}
                    </span>
                    <span>{plan?.description}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleDeletePlan}
            className='flex w-fit items-center gap-2 self-end rounded-lg bg-red-500 px-4 py-2 text-white'
          >
            Delete
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default DashboardPlanDetailsView;
