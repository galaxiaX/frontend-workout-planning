import { BASE_API } from '@/config-global';
import { LoginProps } from '@/types/user';
import { axiosReq, endpoints } from '@/utils/axios';

export const postRegister = async (props: any) => {
  const url = BASE_API + endpoints.auth.register;
  const res = await axiosReq.post(url, props);

  return res;
};

export const postLogin = async (props: LoginProps) => {
  const url = BASE_API + endpoints.auth.login;
  const res = await axiosReq.post(url, props);

  return res;
};

export const getProfile = async () => {
  const url = BASE_API + endpoints.auth.profile;
  const res = await axiosReq.get(url);

  return res;
};
