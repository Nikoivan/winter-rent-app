import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Stack } from '@mui/material';

import { RentFormFields } from '../../../lib/redux/slices/calendarSlice/calendar.types.ts';
import CalendarRentItem from '../RentItem/Calendar-RentItem.tsx';

type CalendarRentListProps = {
  items: Partial<RentFormFields>[];
  onDelete(some: string): void;
};

const cnCalendar = cn('Calendar');

const CalendarRentList: FC<CalendarRentListProps> = ({ items, onDelete }) => (
    <>
        {!!items.length && (
        <Stack className={cnCalendar('RentList')} direction='row' flexWrap='wrap' spacing={1} rowGap={1} sx={{ mt: 2 }}>
            {items.map((item, idx) => (
                <CalendarRentItem item={item} onDelete={onDelete} key={idx} />
        ))}
        </Stack>
    )}
    </>
);

export default CalendarRentList;
