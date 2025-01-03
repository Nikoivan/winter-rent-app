import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Stack } from '@mui/material';
import { RentFormFields } from '../lib/calendar.types.ts';

type CalendarRentListProps = {
  items: Partial<RentFormFields>[];
};

const cnCalendar = cn('Calendar');

const CalendarRentList: FC<CalendarRentListProps> = ({ items }) => (
    <>
        {!!items.length && (
        <Stack className={cnCalendar('RentList')} direction='row' flexWrap='wrap' spacing={1}>
            <span>
                TEST
            </span>
        </Stack>
    )}
    </>
);

export default CalendarRentList;
