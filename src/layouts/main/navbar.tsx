'use client';

import { NavbarContext } from '@/components/navbar/navbar-context';
import { paths } from '@/routes/path';
import { NavMenuType } from '@/types/nav';
import { Drawer } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

const Navbar = () => {
  const pathname = usePathname();
  const { showNavbar, setShowNavbar } = useContext(NavbarContext);

  const fullNavMenuList: NavMenuType[] = [
    {
      title: 'Dashboard',
      url: paths.dashboard.root
    },
    {
      title: 'New plan',
      url: paths.dashboard.plan.new
    }
  ];

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  useEffect(() => {
    if (pathname) {
      setShowNavbar(false);
    }
  }, [pathname, setShowNavbar]);

  return (
    <Drawer
      anchor='left'
      open={showNavbar}
      disableScrollLock
      keepMounted
      onClose={closeNavbar}
    >
      <div className='flex h-full w-[280px] shrink-0 flex-col bg-white shadow-lg'>
        <div className='flex h-14 shrink-0 items-center gap-3 lg:h-20'>
          <button onClick={closeNavbar} className='flex p-2 text-2xl'>
            <CgClose />
          </button>

          <Link
            href={paths.dashboard.root}
            className='flex shrink-0 items-center gap-4'
          >
            <Image
              src={'/next.svg'}
              alt='logo'
              height={80}
              width={246}
              priority
              className='h-[32px] w-[97px] object-contain lg:h-[40px] lg:w-[123px]'
            />
          </Link>
        </div>

        <div className='flex flex-col gap-1'>
          {fullNavMenuList.map(menu => (
            <Link
              key={menu.title}
              href={menu?.disable ? '' : menu?.url || ''}
              onClick={menu?.disable ? undefined : closeNavbar}
              className={`${menu?.disable ? 'text-gray-300' : 'text-[#22242A]'} ${pathname === menu?.url ? 'bg-gray-200' : ''} flex h-11 items-center px-6 font-medium`}
            >
              {menu.title}
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default Navbar;
