import { Cities, DayType, RecordType } from './calendar.types.ts';

const citiesValues = new Set<string>(Object.values(Cities));

export function isCities(value: unknown): value is Cities {
  return !!value && typeof value === 'string' && citiesValues.has(value);
}

export function isRecordType(value: unknown): value is RecordType {
  return (
    !!value &&
    typeof value === 'object' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'name' in value &&
    value.name !== '' &&
    typeof value.name === 'string' &&
    'tel' in value &&
    typeof value.tel === 'number' &&
    'peopleAmount' in value &&
    value.peopleAmount !== 0 &&
    typeof value.peopleAmount === 'number' &&
    'city' in value &&
    !!value.city &&
    isCities(value.city)
  );
}

export function isDay(value: unknown): value is DayType {
  return (
    !!value &&
    typeof value === 'object' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'date' in value &&
    typeof value.date === 'string' &&
    'records' in value &&
    Array.isArray(value.records) &&
    value.records.every(isRecordType)
  );
}
