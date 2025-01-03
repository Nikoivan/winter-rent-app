import { PayloadAction } from '@reduxjs/toolkit';

export enum Cities {
  SEVASTOPOL = 'Севастополь',
  SIMFEROPOL = 'Симферополь',
  BAKHCHISARAY = 'Бахчисарай',
  SOKOLINOE = 'Соколиное',
  TANKOVOE = 'Танковое',
  YALTA = 'Ялта',
  EVPATORIYA = 'Евпатория',
  ALUSHTA = 'Алушта',
}

export enum RentPieceNames {
  SNOWBOARD_KIT = 'Сноуборд комплект',
  SKI_KIT = 'Лыжи комплект',
  BOOTS = 'Ботинки',
  TUBING = 'Тюбинг',
  JACKET = 'Куртка',
  PANTS = 'Штаны',
  GLOVES = 'Перчатки',
  GLASSES = 'Очки',
  HELMET = 'ШЛЕМ',
}

export enum SIZES {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export type RentFormFields = {
  name: RentPieceNames | '';
  gender: 'М' | 'Ж' | '';
  height: number | '';
  size: number | '';
  amount: number | '';
};

export type ChildrenData = {
  count: string;
  age: string;
  needChildSeat: boolean;
};

export type RecordType = {
  id: string;
  city: Cities;
  name: string;
  tel: string;
  peopleAmount: number;
  children?: ChildrenData;
  comment?: string;
  rent?: Partial<RentFormFields>[];
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
export type RemoveRecordAction = PayloadAction<{ id: string; date: string }>;
export type PatchRecordAction = PayloadAction<{ id: string; date: string; record: RecordType }>;

export type ValidationResult = { name: boolean; tel: boolean; peopleAmount: boolean; city: boolean };
