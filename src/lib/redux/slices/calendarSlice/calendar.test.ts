import { getPathByFulldate } from './calendar.utils';

test('Check path by FullDate', () => {
  const path = getPathByFulldate({ year: '2025', month: '11', date: '20' });

  expect(path).toBe('20-11-2025');
});
