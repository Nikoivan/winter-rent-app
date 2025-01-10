import { FC, lazy, Suspense } from 'react';

const ReportsAsync = lazy(() => import('./Reports.async'));

const Reports: FC = () => (
    <Suspense>
        <ReportsAsync />
    </Suspense>
);

export default Reports;
