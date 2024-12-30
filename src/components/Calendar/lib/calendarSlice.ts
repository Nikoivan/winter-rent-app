import { createSlice } from '@reduxjs/toolkit';
import { AddRecordAction, PatchRecordAction, RemoveRecordAction } from './calendar.types.ts';
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
    },
    patchRecord: (state, action: PatchRecordAction) => {
      const { date, id, record } = action.payload;

      const day = state.days.find(day => day.date === date);

      if (!day) {
        throw new Error('Day with current date is not defined');
      }

      const currentRecord = day.records.find(record => record.id === id);

      if (!currentRecord) {
        throw new Error('Day with current id is not defined');
      }

      Object.assign(currentRecord, record);
    },
    removeRecord: (state, action: RemoveRecordAction) => {
      const { date, id } = action.payload;

      const day = state.days.find(day => day.date === date);

      if (!day) {
        throw new Error('Day with current date is not defined');
      }

      const checkLength = day.records.length;

      day.records = day.records.filter(record => record.id !== id);

      if (checkLength === day.records.length) {
        throw new Error('Day with current id is not defined');
      }
    }
  }
});

export const calendarActions = calendarSlice.actions;
