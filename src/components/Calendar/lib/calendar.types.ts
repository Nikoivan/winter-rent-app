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
  tel: string;
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
  id: string;
  date: string;
  records: RecordType[];
};

export type CalendarSliceState = {
  days: DayType[];
};

export type AddRecordAction = PayloadAction<{ date: string; record: RecordType }>;

export type ValidationResult = { name: boolean; tel: boolean; peopleAmount: boolean; city: boolean };
