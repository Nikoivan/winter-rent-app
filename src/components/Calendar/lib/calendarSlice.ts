import { createSlice } from '@reduxjs/toolkit';
import { AddDayAction, CalendarSliceState } from './calendar.types.ts';

const initialState: CalendarSliceState = {
  days: []
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addRecord: (state, action: AddDayAction) => {
      state.days.push(action.payload.date);
    }
  }
});

export const calendarActions = calendarSlice.actions;
