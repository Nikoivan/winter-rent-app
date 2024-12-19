import { ContactInfo, Drivers, RentItem, RentTypes } from './redux/slices/auditSlice/auditSlice.types.ts';

const rentTypesValues = new Set(Object.values(RentTypes));
const keysOfContactInfo = new Set(['clientName', 'clientPhone', 'driver']);
const driversValues = new Set(Object.values(Drivers));

export function isRentType(value: unknown): value is RentTypes {
  return typeof value === 'string' && rentTypesValues.has(value as RentTypes);
}

export function isKeyofContactInfo(value: unknown): value is keyof ContactInfo {
  return typeof value === 'string' && keysOfContactInfo.has(value);
}

export function isDrivers(value: unknown): value is Drivers {
  return typeof value === 'string' && driversValues.has(value as Drivers);
}

export function isContactInfo(value: unknown): value is ContactInfo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const values = Object.values(value);

  return values.every(Boolean);
}

export function isRentItem(value: unknown): value is RentItem {
  return (
    !!value &&
    typeof value === 'object' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'payed' in value &&
    typeof value.payed === 'boolean' &&
    'contactInfo' in value &&
    isContactInfo(value.contactInfo) &&
    'items' in value &&
    Array.isArray(value.items)
  );
}

export function isRentItemsArray(value: unknown): value is RentItem[] {
  return !!value && Array.isArray(value) && !!value.length && value.every(isRentItem);
}
