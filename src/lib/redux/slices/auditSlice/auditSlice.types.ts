import { PayloadAction } from '@reduxjs/toolkit';

export enum Drivers {
  VICTOR_D = 'Victor_Drishlyak',
  ANTON_V = 'Anton_Vasiliev',
  KARPENKO_Y = 'Karpenko_Yuriy',
  KARPENKO_S = 'Karpenko_Aleksander',
  TARABAN_A = 'Tarabanov_Andrey',
  TARABAN_S = 'Tarabanov_Aleksander',
  TARBAN_D = 'Tarabanov_Denis',
  DIRDOS = 'Oleg_Dirdos',
  GULAY = 'Oleg_Gulyaev',
  TAIR = 'Tair',
  CHASHIN = 'Sergey_Chashin',
  RUSLAN_A = 'Ruslan_Alie',
  GAEVSKI = 'Aleksy_Gaevski',
  SUSANIN = 'Sergey_Homenok',
  MEDVEJONOK = 'Aleksander_',
  DZHAMGOTSEV_K = 'Dzhamgotsev_Kirill',
  DZHAMGOTSEV_V = 'Dzhamgotsev_Vycheslav',
  GAMBOS = 'Evgeniy_Glembotskiy',
}

export type AuditSlice = {
  activeTab: AuditTabs;
  rentItems: RentItem[];
};

export enum RentTypes {
  SNOWBOARD = 'snowboard',
  SKI = 'ski',
  BOOTS = 'boots',
  TUBING = 'tubing',
  PANTS = 'pants',
  JACKET = 'jacket',
  GLASSES = 'glasses',
  HELMET = 'helmets',
}

export type ContactInfo = {
  clientName: string;
  clientPhone: string;
  driver: Drivers;
};

export type RentPieceType = {
  id: string;
  title: string;
  type: RentTypes;
  price: number;
  returned: boolean;
  count: number;
  payed: boolean;
};

export type RentItem = {
  id: string;
  contactInfo: ContactInfo;
  items: RentPieceType[];
  payed: boolean;
  comment?: string;
};

export enum AuditTabs {
  ACTIVE = 'active',
  RETURNED = 'returned',
}

export type RentItemAction = PayloadAction<{ id: string }>;
export type RentItemAddAction = PayloadAction<{ id: string; contactInfo: ContactInfo }>;
export type SelectTabAction = PayloadAction<{ tab: AuditTabs }>;
export type RentPieceAction = PayloadAction<{ itemId: string; pieceId: string }>;
export type RentPieceAddAction = PayloadAction<{ itemId: string; type: RentTypes }>;
