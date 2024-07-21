'use client';

import { useAuthContext } from '@/auth/hooks';
import DashboardPlanDetailsView from '@/sections/dashboard/view/dashboard-plan-details-view';
import { getPlanById } from '@/services/plan';
import { IPlan } from '@/types/plan';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  params: {
    id: string;
  };
};

const PlanDetailsPage = ({ params }: Props) => {
  const { id } = params;

  const { authenticated } = useAuthContext();

  const [planDetails, setPlanDetails] = useState<IPlan | null>(null);

  const handleGetPlanDetails = async () => {
    try {
      const res = await getPlanById(id);
      setPlanDetails(res);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || 'An error occurred. Please try again'
      );
    }
  };

  useEffect(() => {
    if (id && authenticated) {
      handleGetPlanDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authenticated]);

  if (!planDetails) {
    return null;
  }

  return <DashboardPlanDetailsView planDetails={planDetails} />;
};

export default PlanDetailsPage;
