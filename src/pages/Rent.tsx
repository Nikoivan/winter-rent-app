import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import PageHeader from '../components/PageHeader/PageHeader.tsx';

const RentPage: FC = () => {
		return (
    <main>
        <PageHeader title='Учет проката' />
        <Outlet />
    </main>
		);
};

export default RentPage;