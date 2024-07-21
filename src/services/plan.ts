import { BASE_API } from '@/config-global';
import { IPlan } from '@/types/plan';
import { axiosReq, endpoints } from '@/utils/axios';

export const getPlans = async () => {
  const url = BASE_API + endpoints.plans.root;
  const res = await axiosReq.get(url);

  return res;
};

export const getPlanById = async (id: string) => {
  const url = BASE_API + endpoints.plans.planDetails(id);
  const res = await axiosReq.get(url);

  return res;
};

export const postCreatePlan = async (props: Partial<IPlan>) => {
  const url = BASE_API + endpoints.plans.root;
  const res = await axiosReq.post(url, props);

  return res;
};

export const deletePlan = async (id: string) => {
  const url = BASE_API + endpoints.plans.planDetails(id);
  const res = await axiosReq.delete(url);

  return res;
};
