import { createSlice } from '@reduxjs/toolkit';

import {
  RentItemAction,
  RentItemAddAction,
  RentPieceAction,
  RentPieceActionTypes,
  RentPieceAddAction,
  SelectTabAction
} from './auditSlice.types.ts';
import { createRentPieces, getInitialState } from './auditSlice.utils.ts';

export const auditSlice = createSlice({
  name: 'audit',
  initialState: getInitialState(),
  reducers: {
    selectTab: (state, action: SelectTabAction) => {
      state.activeTab = action.payload.tab;
    },
    addRentItem: (state, action: RentItemAddAction) => {
      state.rentItems.push({ ...action.payload, items: [] });
    },
    checkChangeRentPiece: (state, action: RentPieceAction) => {
      const { itemId, pieceId, actionType } = action.payload;
      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find rentItem with id ' + itemId);
      }

      if (actionType === RentPieceActionTypes.DELETE) {
        currentItem.items = currentItem.items.filter(({ id }) => id !== pieceId);

        return;
      }

      const currentPiece = currentItem.items.find(({ id }) => id === pieceId);

      if (!currentPiece) {
        throw new Error('We could not find pieceItem with id ' + pieceId);
      }

      if (actionType === RentPieceActionTypes.RETURN) {
        currentPiece.returned = !currentPiece.returned;

        return;
      } else if (actionType === RentPieceActionTypes.PAY) {
        currentPiece.payed = !currentPiece.payed;

        return;
      }
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
    },
    addRentPiece: (state, action: RentPieceAddAction) => {
      const { itemId, type } = action.payload;
      const currentItem = state.rentItems.find(({ id }) => id === itemId);

      if (!currentItem) {
        throw new Error('We could not find rentItem with id ' + itemId);
      }

      const newPieces = createRentPieces(type);

      for (const piece of newPieces) {
        const identicalType = currentItem.items.find(({ payed, type: idType }) => !payed && idType === piece.type);

        if (identicalType) {
          identicalType.count += 1;
        } else {
          currentItem.items.push(piece);
        }
      }
    }
  }
});

export const auditActions = auditSlice.actions;
