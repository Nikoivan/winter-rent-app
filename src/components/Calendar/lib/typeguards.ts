import { Cities } from './calendarSlice.ts';

const citiesValues = new Set<string>(Object.values(Cities));

export function isCities(value: unknown): value is Cities {
  return !!value && typeof value === 'string' && citiesValues.has(value);
}
