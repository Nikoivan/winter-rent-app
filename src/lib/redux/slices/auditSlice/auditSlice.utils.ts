import { v4 } from 'uuid';
import { AuditSlice, AuditTabs, RentPieceType, RentTypes } from './auditSlice.types';
import { isRentItemsArray } from '../../../typeguards.ts';

export function getCurrentRentStateName(): string {
  const date = new Date();

  return `rent_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getInitialState(): AuditSlice {
  const currentStateName = getCurrentRentStateName();
  const jsonState = window.localStorage.getItem(currentStateName);
  const currentRentState: AuditSlice = {
    activeTab: AuditTabs.ACTIVE,
    rentItems: []
  };

  if (jsonState) {
    try {
      const rentItems = JSON.parse(jsonState);

      if (isRentItemsArray(rentItems)) {
        currentRentState.rentItems = rentItems;
      }
    } catch {
      // do nothing
    }
  }

  return currentRentState;
}

function getPieceData(type: RentTypes): { title: string; price: number; type: RentTypes }[] {
  const pieces = [];

  switch (type) {
    case RentTypes.HELMET: {
      pieces.push({ title: 'Шлем', price: 500, type: RentTypes.BOOTS });

      break;
    }

    case RentTypes.SKI: {
      pieces.push({ title: 'Лыжи', price: 500, type: RentTypes.SKI });
      pieces.push({ title: 'Ботинки', price: 500, type: RentTypes.BOOTS });

      break;
    }

    case RentTypes.TUBING: {
      pieces.push({ title: 'Тюбинг', price: 500, type: RentTypes.TUBING });

      break;
    }

    case RentTypes.PANTS: {
      pieces.push({ title: 'Штаны', price: 400, type: RentTypes.PANTS });

      break;
    }

    case RentTypes.GLOVES: {
      pieces.push({ title: 'Перчатки', price: 400, type: RentTypes.PANTS });

      break;
    }

    case RentTypes.JACKET: {
      pieces.push({ title: 'Куртка', price: 400, type: RentTypes.JACKET });

      break;
    }

    case RentTypes.GLASSES: {
      pieces.push({ title: 'Маска', price: 500, type: RentTypes.GLASSES });

      break;
    }

    default: {
      pieces.push({ title: 'Сноуборд', price: 500, type: RentTypes.SNOWBOARD });
      pieces.push({ title: 'Ботинки', price: 500, type: RentTypes.BOOTS });
    }
  }

  return pieces;
}

export function createRentPieces(type: RentTypes): RentPieceType[] {
  const pieces = getPieceData(type);

  return pieces.map(piece => ({
    ...piece,
    id: v4(),
    returned: false,
    payed: false,
    count: 1
  }));
}
