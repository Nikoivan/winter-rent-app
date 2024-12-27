import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { RecordType } from '../lib/calendar.types.ts';
import TelAnchor from '../../Anchor/TelAnchor.tsx';

const cnCalendar = cn('Calendar');

const CalendarItem: FC<RecordType> = ({ name, tel, peopleAmount }) => (
    <ListItem className={cnCalendar('Item')}>
        <ListItemAvatar>
            <PersonIcon />
        </ListItemAvatar>
        <ListItemText
            primary={`${name} - ${peopleAmount} человек`}
            secondary={<TelAnchor tel={tel} />}
            slotProps={{ secondary: { fontSize: 'large', color: 'info' } }}
    />
    </ListItem>
);

export default CalendarItem;
