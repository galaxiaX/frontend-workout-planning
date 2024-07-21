'use client';

import { useAuthContext } from '@/auth/hooks';
import { NavbarContext } from '@/components/navbar/navbar-context';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FiMenu } from 'react-icons/fi';
import { paths } from '@/routes/path';
import { IoLogOutOutline } from 'react-icons/io5';

const Header = () => {
  const { user, logout, authenticated } = useAuthContext();
  const { setShowNavbar } = useContext(NavbarContext);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push(paths.auth.login);
    } catch (error) {
      console.error(error);
      toast.error('เกิดข้อผิดพลาด ไม่สามารถออกจากระบบได้');
    }
  };

  return (
    <header className='z-50 flex h-14 shrink-0 items-center justify-between px-4 shadow-[0_4px_8px_0_#919EAB29] lg:h-20 lg:px-[8%]'>
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setShowNavbar(true)}
          className='flex p-2 text-2xl'
        >
          <FiMenu />
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

      {authenticated && (
        <div className='flex items-center gap-2'>
          <div className='flex flex-col text-sm font-medium lg:text-base'>
            <p>{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm text-white'
          >
            Logout
            <IoLogOutOutline />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
