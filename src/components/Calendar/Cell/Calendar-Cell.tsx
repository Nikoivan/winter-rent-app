import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@mui/material';
import { CellType } from '../calendar.utils.ts';

const cnCalendar = cn('Calendar');

type CalendarCellProps = CellType & {
  selected: boolean;
  onCellClick(): void;
};

const CalendarCell: FC<CalendarCellProps> = ({ prop, date, selected, onCellClick }) => (
    <div className={cnCalendar('Cell', { selected })}>
        <Button className={cnCalendar('Btn')} onClick={onCellClick} color={prop ? 'inherit' : 'primary'}>
            {date}
        </Button>
    </div>
);

export default CalendarCell;
