import { FC, lazy, Suspense } from 'react';

const AuditAsync = lazy(() => import('./Audit.async.tsx'));

const Audit: FC = () => (
    <Suspense>
        <AuditAsync />
    </Suspense>
);

export default Audit;
