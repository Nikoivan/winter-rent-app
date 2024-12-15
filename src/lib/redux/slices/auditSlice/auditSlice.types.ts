import {PayloadAction} from '@reduxjs/toolkit';

export enum AuditTabs {
		ACTIVE = 'active',
		RETURNED = 'returned'
}

export type RentItemAction = PayloadAction<{ id: string }>;
export type SelectTabAction = PayloadAction<{ tab: AuditTabs }>;
export type RentPieceAction = PayloadAction<{ itemId: string, pieceId: string }>;
