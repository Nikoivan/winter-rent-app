import { createSlice } from '@reduxjs/toolkit';

import { AuditTabs, RentPieceAction, SelectTabAction } from './auditSlice.types.ts';

enum Drivers {
  VICTOR_D = 'Victor_Drishlyak',
  ANTON_V = 'Anton_Vasiliev',
  KARPENKO_Y = 'Karpenko_Yuriy',
  KARPENKO_S = 'Karpenko_Aleksander',
  TARABAN_A = 'Tarabanov_Andrey',
  TARABAN_S = 'Tarabanov_Aleksander',
  TARBAN_D = 'Tarabanov_Denis',
  DIRDOS = 'Oleg_Dirdos',
  GULAY = 'Oleg_Gulyaev',
  RUSLAN_A = 'Ruslan_Alie',
  GAEVSKI = 'Aleksy_Gaevski',
  SUSANIN = 'Sergey_Homenok',
  MEDVEJONOK = 'Aleksander_',
  TAIR = 'Tair',
  CHASHIN = 'Sergey_Chashin',
  MASLYUK = 'Vladimir_Maslyukov',
  GAMBOS = 'Evgeniy_Glembotskiy',
  DZHAMGOTSEV_K = 'Dzhamgotsev_Kirill',
  DZHAMGOTSEV_V = 'Dzhamgotsev_Vycheslav'
}

type AuditSlice = {
  activeTab: AuditTabs;
  rentItems: RentItem[];
}

enum RentTypes {
  SNOWBOARD = 'snowboard',
  SKI = 'ski',
  BOOTS = 'boots',
  TUBING = 'tubing',
  PANTS = 'pants',
  JACKET = 'jacket',
  GLASSES = 'glasses',
  HELMET = 'helmets'
}

export type RentPiece = {
  id: string;
  title: string;
  type: RentTypes;
  price: number;
  returned: boolean;
  count: number;
}

type RentItem = {
  id: string;
  contactInfo: {
    clientName: string;
    clientPhone: string;
    driver: Drivers;
  };
  items: RentPiece[];
  payed: boolean;
  comment?: string;
}

const testItems: RentItem[] = [
  {
    id: '323223',
    contactInfo: {
      clientName: 'Иванов Иван Иванович',
      clientPhone: '+797811111111',
      driver: Drivers.ANTON_V
    },
    items: [
      {
        id: '3232233232',
        title: 'Сноуборд',
        type: RentTypes.SNOWBOARD,
        price: 500,
        returned: false,
        count: 1
      },
      {
        id: '32322123232',
        title: 'Ботинки',
        type: RentTypes.SNOWBOARD,
        price: 500,
        returned: false,
        count: 3
      },
      {
        id: '32323',
        title: 'Сноуборд',
        type: RentTypes.SNOWBOARD,
        price: 500,
        returned: false,
        count: 1
      },
      {
        id: 'dedss',
        title: 'Сноуборд',
        type: RentTypes.SNOWBOARD,
        price: 500,
        returned: false,
        count: 1
      },
      {
        id: 'dedexcd',
        title: 'Сноуборд',
        type: RentTypes.SNOWBOARD,
        price: 500,
        returned: false,
        count: 1
      }
    ],
    payed: false
  }
];

const initialState: AuditSlice = {
  activeTab: AuditTabs.ACTIVE,
  rentItems: [...testItems]
};

export const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    selectTab: (state, action: SelectTabAction) => {
      state.activeTab = action.payload.tab;
    },
    checkReturnRentPiece: (state, action: RentPieceAction) => {
      const { itemId, pieceId } = action.payload;
      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find rentItem with id ' + itemId);
      }

      const currentPiece = currentItem.items.find(({ id }) => id === pieceId);

      if (!currentPiece) {
        throw new Error('We could not find pieceItem with id ' + pieceId);
      }

      currentPiece.returned = !currentPiece.returned;
    },
    removeRentPiece: (state, action: RentPieceAction) => {
      const { itemId, pieceId } = action.payload;

      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find item with id ' + itemId);
      }

      currentItem.items = currentItem.items.filter(({ id }) => id !== pieceId);
    }
  }
});

export const auditActions = auditSlice.actions;
