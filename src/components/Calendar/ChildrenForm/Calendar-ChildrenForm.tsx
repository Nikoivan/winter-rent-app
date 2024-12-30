import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { TextField } from '@mui/material';

const cnCalendar = cn('Calendar');

const CalendarChildrenForm: FC = () => (
    <div className={cnCalendar('ChildrenForm')}>
        <TextField />
    </div>
);

export default CalendarChildrenForm;
