import { ChangeEvent, FocusEvent, FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { v4 } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent } from '@mui/material';

import {
  RecordType,
  RentFormFields,
  ValidationResult,
} from '../../../lib/redux/slices/calendarSlice/calendar.types.ts';
import { isChildrenData, isCities, isRecordType } from '../../../lib/redux/slices/calendarSlice/typeguards.ts';
import { getLabelByRentFormField, validateDialogForm } from '../../../lib/redux/slices/calendarSlice/calendar.utils.ts';
import CalendarChildrenForm from '../ChildrenForm/Calendar-ChildrenForm.tsx';
import CalendarSelectCities from '../SelectCities/Calendar-SelectCities.tsx';
import CalendarRent from '../Rent/Calendar-Rent.tsx';
import CalendarRentList from '../RentList/Calendar-RentList.tsx';
import CalendarDialogInputs from '../DialogInputs/Calendar-DialogInputs.tsx';

type CalendarDialogProps = {
  isOpen: boolean;
  formData?: RecordType;
  title?: string;
  submitLabel?: string;
  onSubmit(formFields: RecordType): void;
  onCancel: () => void;
};

const cnCalendar = cn('Calendar');
const initialFormFields = { name: '', tel: '', peopleAmount: 0 };
const initialValidation = { name: true, tel: true, peopleAmount: true, city: true };

const CalendarDialog: FC<CalendarDialogProps> = ({ isOpen, formData, title, submitLabel, onSubmit, onCancel }) => {
  const [formFields, setFormFields] = useState<Partial<RecordType>>(formData || initialFormFields);
  const [validation, setValidation] = useState<ValidationResult>(initialValidation);

  const onChangeStringsFields = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormFields(prev => ({ ...prev, [name]: name === 'peopleAmount' || name === 'tel' ? Number(value) : value }));
  };
  const onChangePhone = (tel: string) => {
    setFormFields(prev => ({ ...prev, tel }));
  };
  const onChangeChildrenForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const children = formFields.children ? { ...formFields.children, [name]: value } : { [name]: value };

    if (!isChildrenData(children)) {
      return;
    }

    setFormFields(prev => ({ ...prev, children }));
  };
  const onChangeSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    if (name !== 'city' || !isCities(value)) {
      return;
    }

    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const onFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;

    if (!validation[name as keyof ValidationResult]) {
      setValidation(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmitClick = () => {
    const validationResult = validateDialogForm(formFields);

    if (Object.values(validationResult).some(valid => !valid)) {
      setValidation(validationResult);

      return;
    }

    const data = { ...formFields, id: v4() };

    if (!isRecordType(data)) {
      return;
    }

    setFormFields(initialFormFields);
    onSubmit(data);
  };
  const onSubmitRent = (rentPieces: Partial<RentFormFields>) => {
    const rent = 'rent' in formFields && Array.isArray(formFields.rent) ? [...formFields.rent] : [];
    rent.push(rentPieces);

    setFormFields(prev => ({ ...prev, rent }));
  };
  const onDelete = (label: string) => {
    const rent = formFields.rent?.filter(item => getLabelByRentFormField(item) !== label);

    if (!rent) {
      throw new Error('Отсутствует прокат');
    }

    setFormFields(prev => ({ ...prev, rent }));
  };

  return (
    <Dialog className={cnCalendar('Dialog')} open={isOpen} onClose={onCancel} scroll='paper'>
      <DialogTitle>{title || 'Добавить запись'}</DialogTitle>
      <DialogContent>
        <CalendarDialogInputs
          formFields={formFields}
          validation={validation}
          onChangeStringsFields={onChangeStringsFields}
          onChangePhone={onChangePhone}
          onFocus={onFocus}
        />
        <CalendarChildrenForm form={formFields.children} onChange={onChangeChildrenForm} />
        <CalendarSelectCities
          value={formFields.city}
          invalid={!validation.city}
          onChange={onChangeSelect}
          onFocus={onFocus}
        />
        <CalendarRent onSubmit={onSubmitRent} />
        {!!formFields.rent?.length && <CalendarRentList onDelete={onDelete} items={formFields.rent} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={handleSubmitClick}>{submitLabel || 'Добавить'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarDialog;
