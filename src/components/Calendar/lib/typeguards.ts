import { ChildrenData, Cities, DayType, RecordType, RentFormFields, RentPieceNames } from './calendar.types.ts';

const citiesKeys = new Set<string>(Object.keys(Cities));
const recordTypeKeys = new Set<string>(['id', 'city', 'name', 'tel', 'peopleAmount', 'children', 'comment', 'rent']);
const keysOfRentPieceNames = new Set<string>(Object.keys(RentPieceNames));
const keysOfRentFormFields = new Set<string>(['name', 'gender', 'height', 'size', 'amount']);

export function isCities(value: unknown): value is Cities {
  return !!value && typeof value === 'string' && citiesKeys.has(value);
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
    typeof value.tel === 'string' &&
    'peopleAmount' in value &&
    value.peopleAmount !== 0 &&
    typeof value.peopleAmount === 'number' &&
    'city' in value &&
    !!value.city &&
    isCities(value.city)
  );
}

export function isChildrenData(value: unknown): value is ChildrenData {
  return (
    !!value &&
    typeof value === 'object' &&
    'count' in value &&
    typeof value.count === 'string' &&
    'age' in value &&
    typeof value.age === 'string' &&
    'needChildSeat' in value &&
    typeof value.needChildSeat === 'boolean'
  );
}

export function isKeyOfRecordType(value: unknown): value is keyof RecordType {
  return !!value && typeof value === 'string' && recordTypeKeys.has(value);
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

export function isKeyofRentPieceNames(value: unknown): value is RentPieceNames {
  return !!value && typeof value === 'string' && keysOfRentPieceNames.has(value);
}

export function isKeyofRentFormFields(value: unknown): value is keyof RentFormFields {
  return !!value && typeof value === 'string' && keysOfRentFormFields.has(value);
}
