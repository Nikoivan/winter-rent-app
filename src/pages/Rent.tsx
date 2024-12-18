import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import PageHeader from '../components/PageHeader/PageHeader.tsx';

const RentPage: FC = () => {
  return (
      <main className='Main'>
          <PageHeader title='Учет проката' />
          <Outlet />
      </main>
  );
};

export default RentPage;
