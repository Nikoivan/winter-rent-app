import { cn } from '@bem-react/classname';
import { FC } from 'react';
import Calendar from '../Calendar/Calendar.tsx';

const cnDatePicker = cn('DatePicker');

const DatePicker: FC = () => {
  return (
      <div className={cnDatePicker()}>
          <Calendar />
      </div>
  );
};

export default DatePicker;
