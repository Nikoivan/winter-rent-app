import { PayloadAction } from '@reduxjs/toolkit';
import { SimpleRentPiece } from '../../../lib/redux/slices/auditSlice/auditSlice.types.ts';

export enum Cities {
  SEVASTOPOL = 'Sevastopol',
  SIMFEROPOL = 'Simferopol',
  BAKHCHISARAY = 'Bakhchisaray',
  YALTA = 'Yalta',
  EVPATORIYA = 'Evpatoriya',
  ALUSHTA = 'Alushta',
  SOKOLINOE = 'Sokolinoe',
}

export type RecordType = {
  city: Cities;
  name: string;
  peopleAmount: number;
  children?: {
    count: string;
    age: string;
    needChildSeat: boolean;
  };
  comment?: string;
  rent?: SimpleRentPiece[];
};

export type DayType = {
  date: string;
  records: RecordType[];
};

export type CalendarSliceState = {
  days: DayType[];
};

export type AddDayAction = PayloadAction<{ date: string }>;
