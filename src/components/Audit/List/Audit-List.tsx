import { FC, memo } from 'react';
import { List } from '@mui/material';

import { RentItem } from '../../../lib/redux/slices/auditSlice/auditSlice.types.ts';
import AuditItem from '../Item/Audit-Item.tsx';

type AuditListProps = {
  items: RentItem[];
};

const AuditListFC: FC<AuditListProps> = ({ items }) => (
    <List>
        {items.map(item => (
            <AuditItem {...item} key={item.id} />
    ))}
    </List>
);

const AuditList = memo(AuditListFC);

export default AuditList;
