'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { AuthContext } from './auth-context';
import { setSession, isValidToken, jwtDecode } from './utils';
import { ActionMapType, AuthStateType, AuthUserType } from '@/types/user';
import { postRegister, postLogin } from '@/services/user';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT'
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const user = jwtDecode(accessToken);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken
            }
          }
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null
          }
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null
        }
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password
    };

    const res = await postLogin(data);

    const { token: accessToken } = res;

    const user = jwtDecode(accessToken);

    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken
        }
      }
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password
    };

    const res = await postRegister(data);

    const { token: accessToken } = res;

    const user = jwtDecode(accessToken);

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          ...user,
          accessToken
        }
      }
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout
    }),
    [login, logout, register, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
