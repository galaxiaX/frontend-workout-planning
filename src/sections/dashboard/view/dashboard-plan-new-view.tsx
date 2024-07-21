'use client';

import { BASE_API } from '@/config-global';
import MainLayout from '@/layouts/main';
import { paths } from '@/routes/path';
import { postCreatePlan } from '@/services/plan';
import { IPlan, IPlanState } from '@/types/plan';
import { endpoints } from '@/utils/axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';
import { FaCheckCircle } from 'react-icons/fa';
import { GrNext } from 'react-icons/gr';
import { VscDebugRestart } from 'react-icons/vsc';

const DashboardPlanNewView = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [planData, setPlanData] = useState('');
  const [goalData, setGoalData] = useState('');
  const [planState, setPlanState] = useState<IPlanState>({
    planName: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    weeklyActivities: [''],
    workoutGoal: ''
  });

  const resetData = () => {
    setPlanData('');
    setGoalData('');
    setPlanState({
      planName: '',
      dateOfBirth: '',
      height: '',
      weight: '',
      weeklyActivities: [''],
      workoutGoal: ''
    });
    setStep(1);
  };

  const goalList = goalData
    ?.split('\n\n')
    ?.map((data: string) => data?.split(': '));

  type PlanListType = {
    title: string;
    content?: {
      day: string;
      exercises: string;
    }[];
    description?: string;
    type: 'plan' | 'note';
  };

  const planList: PlanListType[] = planData
    ?.split('\n\n')
    ?.map((data: string, index) => {
      if (index === 4) {
        const [title, note] = data?.split(': ');
        return { title, description: note, type: 'note' };
      } else {
        const [week, days] = data?.split(':\n');
        const dayList = days?.split('\n')?.map((day: string) => ({
          day: day?.split(': ')[0],
          exercises: day?.split(': ')[1]
        }));
        return { title: week, content: dayList, type: 'plan' };
      }
    });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    }

    if (step === 1) {
      setGenerating(true);
      try {
        const bodyData = {
          dateOfBirth: dayjs(planState.dateOfBirth).format('YYYY-MM-DD'),
          height: Number(planState.height),
          weight: Number(planState.weight),
          weeklyActivities: planState.weeklyActivities.filter(Boolean)
        };

        const res = await fetch(BASE_API + endpoints.plans.goals, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(bodyData)
        });

        const data = res.body;
        if (!data) return;

        const reader = data.getReader();

        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setGoalData(prev => prev + chunkValue);
        }
      } catch (err: any) {
        console.error(err);
        toast.error(
          err?.response?.data?.message || 'An error occurred. Please try again'
        );
      }
      setGenerating(false);
    }

    if (step === 2) {
      setGenerating(true);
      try {
        const bodyData = {
          dateOfBirth: dayjs(planState.dateOfBirth).format('YYYY-MM-DD'),
          height: Number(planState.height),
          weight: Number(planState.weight),
          weeklyActivities: planState.weeklyActivities.filter(Boolean),
          workoutGoal: planState.workoutGoal
        };

        const res = await fetch(BASE_API + endpoints.plans.plan, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(bodyData)
        });

        const data = res.body;
        if (!data) return;

        const reader = data.getReader();

        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setPlanData(prev => prev + chunkValue);
        }
      } catch (err: any) {
        console.error(err);
        toast.error(
          err?.response?.data?.message || 'An error occurred. Please try again'
        );
      }
      setGenerating(false);
    }

    if (step === 3) {
      try {
        const data: Partial<IPlan> = {
          ...planState,
          dateOfBirth: dayjs(planState.dateOfBirth).format('YYYY-MM-DD'),
          height: Number(planState.height),
          weight: Number(planState.weight),
          weeklyActivities: planState.weeklyActivities.filter(Boolean),
          workoutPlan: planList
        };

        const res = await postCreatePlan(data);

        toast.success('Plan created successfully');
        resetData();

        router.push(paths.dashboard.root);
      } catch (err: any) {
        console.error(err);
        toast.error(
          err?.response?.data?.message || 'An error occurred. Please try again'
        );
      }
    }
  };

  const disableNext = () => {
    if (step === 1) {
      return (
        !planState.planName ||
        !planState.dateOfBirth ||
        !planState.height ||
        !planState.weight
      );
    } else if (step === 2) {
      return !planState.workoutGoal;
    } else {
      return false;
    }
  };

  const handleAddActivity = () => {
    setPlanState(prev => ({
      ...prev,
      weeklyActivities: [...prev.weeklyActivities, '']
    }));
  };

  const handleRemoveActivity = (index: number) => {
    setPlanState(prev => ({
      ...prev,
      weeklyActivities: prev.weeklyActivities.filter((_, i) => i !== index)
    }));
  };

  return (
    <MainLayout>
      <section className='mx-auto my-4 flex h-full w-full max-w-[1000px] flex-col gap-8 rounded-xl bg-white px-8 py-6 drop-shadow-[0_0_4px_#1010102f] lg:my-8 lg:px-16 lg:py-12'>
        <header className='shrink-0'>
          <h1 className='text-3xl font-semibold'>New plan</h1>
        </header>

        <div className='flex w-full flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <span>
              Step {step} of 3: {step === 1 ? 'Personal Details' : ''}
              {step === 2 ? 'Workout Goal' : ''}
              {step === 3 ? 'Generated Plan' : ''}
            </span>

            <div className='h-2 w-full rounded-[999px] bg-gray-300'>
              <div
                style={{
                  width: `${((step - 1) / 3) * 100}%`
                }}
                className='h-full rounded-[999px] bg-blue-600 duration-300'
              ></div>
            </div>
          </div>

          {step === 1 && (
            <div className='flex flex-col gap-4'>
              <div className='flex w-full flex-col gap-2'>
                <label
                  htmlFor='planName'
                  className='text-sm font-semibold text-gray-700'
                >
                  Plan Name
                </label>
                <input
                  type='text'
                  id='planName'
                  name='planName'
                  value={planState.planName}
                  onChange={e =>
                    setPlanState({ ...planState, planName: e.target.value })
                  }
                  className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                  placeholder='Plan Name'
                />
              </div>

              <div className='flex w-full flex-col gap-2'>
                <label
                  htmlFor='date-of-birth'
                  className='text-sm font-semibold text-gray-700'
                >
                  Date of Birth
                </label>
                <input
                  type='date'
                  id='date-of-birth'
                  name='date-of-birth'
                  value={planState.dateOfBirth}
                  onChange={e =>
                    setPlanState({ ...planState, dateOfBirth: e.target.value })
                  }
                  className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                  placeholder='Date of Birth'
                />
              </div>

              <div className='flex w-full flex-col gap-2'>
                <label
                  htmlFor='height'
                  className='text-sm font-semibold text-gray-700'
                >
                  Height
                </label>
                <input
                  type='number'
                  id='height'
                  name='height'
                  value={planState.height}
                  onChange={e =>
                    setPlanState({ ...planState, height: e.target.value })
                  }
                  className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                  placeholder='Height'
                />
              </div>

              <div className='flex w-full flex-col gap-2'>
                <label
                  htmlFor='weight'
                  className='text-sm font-semibold text-gray-700'
                >
                  Weight
                </label>
                <input
                  type='number'
                  id='weight'
                  name='weight'
                  value={planState.weight}
                  onChange={e =>
                    setPlanState({ ...planState, weight: e.target.value })
                  }
                  className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                  placeholder='Weight'
                />
              </div>

              <div className='flex w-full flex-col gap-2'>
                <p className='text-sm font-semibold text-gray-700'>
                  Weekly Activities{' '}
                  <span className='text-gray-500'>(optional)</span>
                </p>

                {planState.weeklyActivities.map((activity, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <input
                      type='text'
                      id='weekly-activities'
                      name='weekly-activities'
                      value={activity}
                      onChange={e => {
                        const newActivities = [...planState.weeklyActivities];
                        newActivities[index] = e.target.value;
                        setPlanState(prev => ({
                          ...prev,
                          weeklyActivities: newActivities
                        }));
                      }}
                      className='w-full rounded-md border border-gray-300 p-2 duration-300 focus:outline-none focus:ring focus:ring-blue-500'
                      placeholder='Weekly Activities'
                    />

                    <button
                      onClick={() => handleRemoveActivity(index)}
                      className='p-1 text-2xl text-red-600'
                    >
                      <CgClose />
                    </button>
                  </div>
                ))}

                {planState.weeklyActivities.length < 7 && (
                  <button
                    onClick={handleAddActivity}
                    className='w-fit px-4 py-2 font-medium text-blue-600'
                  >
                    + Add Activity
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='flex flex-col gap-2'>
              <p className='text-lg font-medium'>
                Plan name: {planState.planName}
              </p>

              <p className='text-sm'>
                Choose your workout goal. This will help us generate a plan that
                suits your needs.
              </p>

              <div className='flex flex-col gap-2'>
                {goalList.map((goal, index) => (
                  <label key={index} className='flex gap-4'>
                    <input
                      type='radio'
                      id={index.toString()}
                      name='workoutGoal'
                      value={goal?.at(0)}
                      onChange={e =>
                        setPlanState({
                          ...planState,
                          workoutGoal: e.target.value
                        })
                      }
                      className='mt-1.5 self-start'
                    />
                    <div className='w-full shrink-0'>
                      <span className='text-lg font-medium'>
                        {goal?.at(0) && goal?.at(0) + ': '}
                      </span>
                      <span>{goal?.at(1)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='flex flex-col gap-2'>
              <p className='text-lg font-medium'>
                Plan name: {planState?.planName}
              </p>

              <p className='text-sm'>
                Here is your generated plan. You can regenerate the plan if you
                want to make changes.
              </p>
              <div className='flex flex-col gap-8'>
                {planList.map((plan, index) => (
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
            </div>
          )}

          {!generating && (
            <div className='flex w-fit items-center gap-2 self-end'>
              {step === 3 && (
                <button
                  onClick={resetData}
                  className='flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white duration-300'
                >
                  Regenerate
                  <VscDebugRestart />
                </button>
              )}

              <button
                disabled={disableNext()}
                onClick={handleNext}
                className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white duration-300 disabled:bg-gray-300'
              >
                {step === 3 ? 'Finish' : 'Next'}

                {step === 3 ? <FaCheckCircle /> : <GrNext />}
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default DashboardPlanNewView;
