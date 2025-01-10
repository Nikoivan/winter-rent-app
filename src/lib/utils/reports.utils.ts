import { RentItem, RentTypes } from '../redux/slices/auditSlice/auditSlice.types.ts';

const reportData = {
  payedSumm: 0,
  totalSumm: 0,
  rentPieces: {
    quantity: 0,
    snowboards: 0,
    boots: 0,
    skis: 0,
    tubings: 0,
    jackets: 0,
    pants: 0,
    glasses: 0,
    gloves: 0,
    helmets: 0
  }
};

export function getReportsData(rentItems: RentItem[]): typeof reportData {
  for (const item of rentItems) {
    for (const rentPiece of item.items) {
      const { count, price, payed, type } = rentPiece;

      reportData.totalSumm = reportData.totalSumm + count * price;
      reportData.rentPieces.quantity += 1;

      if (payed) {
        reportData.payedSumm = reportData.payedSumm + count * price;
      }

      switch (type) {
        case RentTypes.SNOWBOARD:
          reportData.rentPieces.snowboards += 1;

          break;

        case RentTypes.BOOTS:
          reportData.rentPieces.boots += 1;

          break;

        case RentTypes.SKI:
          reportData.rentPieces.skis += 1;

          break;

        case RentTypes.JACKET:
          reportData.rentPieces.jackets += 1;

          break;

        case RentTypes.PANTS:
          reportData.rentPieces.pants += 1;

          break;

        case RentTypes.TUBING:
          reportData.rentPieces.tubings += 1;

          break;

        case RentTypes.GLASSES:
          reportData.rentPieces.glasses += 1;

          break;

        case RentTypes.GLOVES:
          reportData.rentPieces.gloves += 1;

          break;

        case RentTypes.HELMET:
          reportData.rentPieces.helmets += 1;

          break;
      }
    }
  }

  return reportData;
}
