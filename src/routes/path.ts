export const paths = {
  root: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register'
  },
  dashboard: {
    root: '/dashboard',
    plan: {
      new: '/dashboard/plan/new',
      details: (id: string) => `/dashboard/plan/${id}`
    }
  }
};
