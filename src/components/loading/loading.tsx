import MainLayout from '@/layouts/main';
import { Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <MainLayout>
      <div className='flex h-full w-full grow justify-center overflow-hidden'>
        <Skeleton
          sx={{ bgcolor: '#e4e4e4' }}
          variant='rectangular'
          animation='wave'
          width={'100dvw'}
          height={'(100dvh - 80px)'}
        />
      </div>
    </MainLayout>
  );
};

export default Loading;
