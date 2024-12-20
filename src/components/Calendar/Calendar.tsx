import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import getNewArr from './calendar.utils';
import CalendarCell from './Cell/Calendar-Cell.tsx';

import './Calendar.scss';
import { IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

const WEEK = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];
const getDate = () => {
  const date = new Date();

  return new Date(date.setDate(1));
};
const cnCalendar = cn('Calendar');

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(getDate());

  const nextMonth = () => {
    const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));

    setCurrentMonth(new Date(newDate));
  };

  const previousMonth = () => {
    const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));

    setCurrentMonth(new Date(newDate));
  };

  const calendarArr = getNewArr(new Date(currentMonth.setDate(1)));
  const handleCellClick = () => {
    console.log('onCellClick');
  };

  return (
      <div className={cnCalendar()}>
          <div className={cnCalendar('Header')}>
              <IconButton onClick={previousMonth} className={cnCalendar('Previous')} color='inherit'>
                  <ArrowLeft fontSize='large' />
              </IconButton>
              <span className={cnCalendar('MonthTitle')}>
                  {MONTHS[currentMonth.getMonth()]}
              </span>
              <IconButton onClick={nextMonth} className={cnCalendar('Next')} color='inherit'>
                  <ArrowRight fontSize='large' />
              </IconButton>
          </div>
          <div className={cnCalendar('RowsWrap')}>
              <div className={cnCalendar('Row')}>
                  {WEEK.map((day, idx) => (
                      <div className={cnCalendar('Cell', { empty: true })} key={idx}>
                          {day}
                      </div>
          ))}
              </div>
              {calendarArr.map((el, idx) => (
                  <div className={cnCalendar('Row')} key={idx}>
                      {el.map((item, id) => (
                          <CalendarCell key={id} selected onCellClick={handleCellClick} {...item} />
            ))}
                  </div>
        ))}
          </div>
      </div>
  );
};

export default Calendar;
