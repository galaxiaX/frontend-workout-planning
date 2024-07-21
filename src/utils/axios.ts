import axios, { AxiosResponse } from 'axios';
import { BASE_API } from '@/config-global';

type ErrorResponseType = {
  response?: {
    status?: number;
    data?: any;
  };
};

const getHeaders = () => {
  return {
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
  };
};

const handleResponse = <T>(response: AxiosResponse): T => {
  return response?.data;
};

const handleError = (error: ErrorResponseType): never => {
  throw error;
};

const axiosInstance = axios.create({ baseURL: BASE_API });

export const axiosReq = {
  get: async <T = any>(url: string): Promise<T> => {
    try {
      // const response = await axiosInstance.get(url, { headers: getHeaders() });
      const response = await axiosInstance.get(url);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  post: async <T = any>(url: string, data?: any): Promise<T> => {
    try {
      // const response = await axiosInstance.post(url, data, {
      //   headers: getHeaders()
      // });
      const response = await axiosInstance.post(url, data);

      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  postUpload: async <T = any>(url: string, data?: any): Promise<T> => {
    try {
      const formData = new FormData();
      formData.append('file', data);
      const response = await axiosInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  put: async <T = any>(url: string, data?: any): Promise<T> => {
    try {
      // const response = await axiosInstance.put(url, data, {
      //   headers: getHeaders()
      // });
      const response = await axiosInstance.put(url, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  },
  delete: async <T = any>(url: string): Promise<T> => {
    try {
      // const response = await axiosInstance.delete(url, {
      //   headers: getHeaders()
      // });
      const response = await axiosInstance.delete(url);
      return handleResponse(response);
    } catch (error) {
      return handleError(error as ErrorResponseType);
    }
  }
};

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
  root: '/',
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    profile: '/api/auth/get-user'
  },
  plans: {
    root: '/api/plans',
    planDetails: (id: string) => `/api/plans/${id}`,
    goals: '/api/plans/goals',
    plan: '/api/plans/plan'
  },
  dashboard: {
    root: 'dashboard',

    planDetails: (id: string) => `/api/plans/${id}`
  }
};
