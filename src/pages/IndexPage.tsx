import { FC } from 'react';
import PageHeader from '../components/PageHeader/PageHeader.tsx';
import Info from '../components/Info/Info.tsx';

const IndexPage: FC = () => (
    <div>
        <PageHeader title='CRM Energy-Tour' />
        <Info />
    </div>
);

export default IndexPage;
