import moment from 'moment';
import { isCities, isDay } from './typeguards.ts';
import { CalendarSliceState, DayType, ValidationResult } from './calendar.types.ts';

export type FullDate = {
  year: string;
  month: string;
  date: string;
};

export type CellType = {
  date: string;
  prop: null | string;
  fullDate: FullDate;
};

function getFirstMonday(date: Date): moment.Moment {
  if (moment(date).weekday() === 1) {
    return moment(date);
  }

  if (moment(date).weekday() === 0) {
    return moment(date).day(-6);
  }

  return moment(date).weekday(1);
}

function getLastSunday(date: Date): moment.Moment {
  const end = moment(date).endOf('month');
  if (end.weekday() === 0) {
    return end;
  }

  return end.day(7);
}

function getCell(currentDate: moment.Moment, date: Date) {
  return {
    fullDate: { year: currentDate.format('YYYY'), month: currentDate.format('MM'), date: currentDate.format('DD') },
    date: currentDate.format('D'),
    prop: currentDate.format('MM') === moment(date).format('MM') ? null : ' Calendar-OtherMonth'
  };
}

export default function getNewArr(date: Date): CellType[][] {
  const amountCells = [];

  const lastSunday = getLastSunday(date);
  let currentDate = getFirstMonday(date);

  while (
    !(currentDate.format('MM') === lastSunday.format('MM') && currentDate.format('DD') === lastSunday.format('DD'))
  ) {
    amountCells.push(getCell(currentDate, date));
    currentDate = currentDate.add(1, 'day');
  }

  amountCells.push(getCell(lastSunday, date));

  const weeksCount = amountCells.length / 7;
  const weeks = [];
  let index = 0;

  for (let i = 0; i < weeksCount; i += 1) {
    const week = [];
    for (let q = 0; q < 7; q += 1) {
      week.push(amountCells[index]);
      index += 1;
    }
    weeks.push(week);
  }

  return weeks;
}

export function getPathByFulldate(fullDate: FullDate): string {
  const { year, month, date } = fullDate;

  return `${date}-${month}-${year}`;
}

export function validatePhone(phone: string): boolean {
  const clearPhone: string = phone.replaceAll('+', '').replaceAll(' ', '');

  return /^[7-9|+][0-9 ]{10,11}/.test(clearPhone);
}

export function validateForm(value: Record<string, unknown>): ValidationResult {
  const result = {
    name: true,
    peopleAmount: true,
    tel: true,
    city: true
  };

  if (!('name' in value) || typeof value.name !== 'string' || value.name === '') {
    result.name = false;
  }
  if (!('tel' in value) || typeof value.tel !== 'string' || !validatePhone(value.tel)) {
    result.tel = false;
  }
  if (
    !('peopleAmount' in value) ||
    typeof value.peopleAmount !== 'number' ||
    value.peopleAmount === 0 ||
    value.peopleAmount > 40
  ) {
    result.peopleAmount = false;
  }
  if (!('city' in value) || !isCities(value.city)) {
    result.city = false;
  }

  return result;
}

export function getCitiesTabs(day?: DayType): string[] {
  const cities: string[] = [];

  if (day && day.records.length > 0) {
    for (const record of day.records) {
      if (!cities.includes(record.city)) {
        cities.push(record.city);
      }
    }
  }

  return cities;
}

export function getInitialState(): CalendarSliceState {
  const jsonState = window.localStorage.getItem('records-calendar');
  const currentCalendarState: CalendarSliceState = {
    days: []
  };

  if (jsonState) {
    try {
      const days = JSON.parse(jsonState);

      if (!!days && Array.isArray(days) && days.every(isDay)) {
        currentCalendarState.days = days;
      }
    } catch {
      // do nothing
    }
  }

  return currentCalendarState;
}
