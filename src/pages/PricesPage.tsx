import { FC } from 'react';

import PageHeader from '../components/PageHeader/PageHeader.tsx';
import PricesInfo from '../components/PricesInfo/PricesInfo.tsx';

const PricesPage: FC = () => (
    <main className='Main'>
        <PageHeader title='Прайс лист' />
        <PricesInfo />
    </main>
);

export default PricesPage;
