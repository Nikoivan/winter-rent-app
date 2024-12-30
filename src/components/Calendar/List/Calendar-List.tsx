import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { List } from '@mui/material';
import { v4 } from 'uuid';

import { RecordType } from '../lib/calendar.types.ts';
import CalendarItem from '../Item/Calendar-Item.tsx';

type CalendarListProps = {
  date: string;
  items: RecordType[];
};

const cnCalendar = cn('Calendar');

const CalendarList: FC<CalendarListProps> = ({ date, items }) => (
    <List className={cnCalendar('List')}>
        {items.map(item => (
            <CalendarItem date={date} {...item} key={v4()} />
    ))}
    </List>
);

export default CalendarList;
