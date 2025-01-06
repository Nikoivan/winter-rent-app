import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Chip } from '@mui/material';
import { getLabelByRentFormField } from '../../../lib/redux/slices/calendarSlice/calendar.utils.ts';
import { RentFormFields } from '../../../lib/redux/slices/calendarSlice/calendar.types.ts';

type CalendarRentItemProps = {
  item: Partial<RentFormFields>;
  onDelete(some: string): void;
};

const cnCalendar = cn('Calendar');

const CalendarRentItem: FC<CalendarRentItemProps> = ({ item, onDelete }) => {
  const label = getLabelByRentFormField(item);

  const handleDelete = () => onDelete(label);

  return (
      <Chip className={cnCalendar('RentItem')} label={label} onDelete={handleDelete} variant='outlined' key={label} />
  );
};

export default CalendarRentItem;
