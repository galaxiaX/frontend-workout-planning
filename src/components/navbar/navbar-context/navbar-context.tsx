'use client';

import { createContext } from 'react';

type NavbarType = {
  showNavbar: boolean;
  setShowNavbar: (showNavbar: boolean) => void;
};

export const NavbarContext = createContext({} as NavbarType);
