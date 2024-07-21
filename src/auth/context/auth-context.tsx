'use client';

import { createContext } from 'react';

import { UserContextType } from '@/types/user';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as UserContextType);
