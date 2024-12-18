import { createSlice } from '@reduxjs/toolkit';

import {
  AuditSlice,
  AuditTabs,
  RentItem,
  RentItemAction,
  RentItemAddAction,
  RentPieceAction,
  RentPieceAddAction,
  SelectTabAction
} from './auditSlice.types.ts';
import { createRentPieces } from './auditSlice.utils.ts';

const testItems: RentItem[] = [];

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
    addRentItem: (state, action: RentItemAddAction) => {
      state.rentItems.push({ ...action.payload, items: [], payed: false });
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
    checkReturnAllRentPieces: (state, action: RentItemAction) => {
      const { id: itemId } = action.payload;
      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find rentItem with id ' + itemId);
      }

      currentItem.items = currentItem.items.map(item => ({ ...item, returned: true }));
    },
    checkPayItem: (state, action: RentItemAction) => {
      const { id: itemId } = action.payload;
      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find rentItem with id ' + itemId);
      }

      currentItem.items = currentItem.items.map(item => ({ ...item, payed: true }));
      currentItem.payed = true;
    },
    addRentPiece: (state, action: RentPieceAddAction) => {
      const { itemId, type } = action.payload;
      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find rentItem with id ' + itemId);
      }

      const newPieces = createRentPieces(type);

      for (const piece of newPieces) {
        const identicalType = currentItem.items.find(({ type: idType }) => idType === piece.type);

        if (identicalType) {
          identicalType.count += 1;
        } else {
          currentItem.items.push(piece);
        }
      }
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
