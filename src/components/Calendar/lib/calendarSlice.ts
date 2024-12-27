import { createSlice } from '@reduxjs/toolkit';
import { AddRecordAction } from './calendar.types.ts';
import { v4 } from 'uuid';
import { getInitialState } from './calendar.utils.ts';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: getInitialState(),
  reducers: {
    addRecord: (state, action: AddRecordAction) => {
      const { date, record } = action.payload;
      const dayByDate = state.days.find(day => date === day.date);

      if (dayByDate) {
        dayByDate.records.push(record);
      } else {
        state.days.push({ id: v4(), date, records: [record] });
      }
    }
  }
});

export const calendarActions = calendarSlice.actions;
