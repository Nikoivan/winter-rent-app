import { FC } from 'react';
import { cn } from '@bem-react/classname';

type CalendarAnchorProps = {
  tel: number;
};

const cnCalendar = cn('Calendar');

const CalendarAnchor: FC<CalendarAnchorProps> = ({ tel }) => (
    <a className={cnCalendar('Anchor')} href={`tel:${tel}`}>
        {tel}
    </a>
);

export default CalendarAnchor;
