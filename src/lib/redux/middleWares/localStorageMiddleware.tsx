import { RootState } from '../store.ts';
import { Middleware } from 'redux';
import { getCurrentRentStateName } from '../slices/auditSlice/auditSlice.utils.ts';

export const localStorageMiddleware: Middleware<object, RootState> = ({ getState }) => {
  return next => action => {
    const result = next(action);
    const {
      audit: { rentItems },
      calendar: { days }
    } = getState();
    const currentStateName = getCurrentRentStateName();

    window.localStorage.setItem(currentStateName, JSON.stringify(rentItems));
    window.localStorage.setItem('records-calendar', JSON.stringify(days));

    return result;
  };
};
