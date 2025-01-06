import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { CellType, getPathByFulldate } from '../../../lib/redux/slices/calendarSlice/calendar.utils.ts';
import { Link } from 'react-router';

const cnCalendar = cn('Calendar');

type CalendarCellProps = CellType & {
  selected: boolean;
};

const CalendarCell: FC<CalendarCellProps> = ({ prop, date, selected, fullDate }) => (
    <Link className={cnCalendar('Cell', { selected })} to={getPathByFulldate(fullDate)}>
        <span className={cnCalendar('Text', { other: !!prop })}>
            {date}
        </span>
    </Link>
);

export default CalendarCell;
