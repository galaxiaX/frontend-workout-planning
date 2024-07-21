'use client';

import { useMemo, useState } from 'react';
import { NavbarContext } from './navbar-context';

type Props = {
  children: React.ReactNode;
};

export const NavbarProvider = ({ children }: Props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const memoizedValue = useMemo(
    () => ({ showNavbar, setShowNavbar }),
    [showNavbar]
  );

  return (
    <NavbarContext.Provider value={memoizedValue}>
      {children}
    </NavbarContext.Provider>
  );
};
