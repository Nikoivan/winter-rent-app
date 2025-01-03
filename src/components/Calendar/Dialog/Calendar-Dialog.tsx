import { ChangeEvent, FocusEvent, FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { v4 } from 'uuid';
import { MuiTelInput } from 'mui-tel-input';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent, TextField } from '@mui/material';

import { RecordType, RentFormFields, ValidationResult } from '../lib/calendar.types.ts';
import { isChildrenData, isCities, isRecordType } from '../lib/typeguards.ts';
import { validateDialogForm } from '../lib/calendar.utils.ts';
import CalendarChildrenForm from '../ChildrenForm/Calendar-ChildrenForm.tsx';
import CalendarSelectCities from '../SelectCities/Calendar-SelectCities.tsx';
import CalendarRent from '../Rent/Calendar-Rent.tsx';

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

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
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

  return (
      <Dialog className={cnCalendar('Dialog')} open={isOpen} onClose={onCancel} scroll='paper'>
          <DialogTitle>
              {title || 'Добавить запись'}
          </DialogTitle>
          <DialogContent>
              <TextField
                  className={cnCalendar('Name')}
                  type='text'
                  name='name'
                  value={formFields.name}
                  error={!validation.name}
                  label='Имя'
                  onChange={onChangeStringsFields}
                  onFocus={onFocus}
                  sx={{ marginTop: '15px' }}
                  fullWidth
        />
              <MuiTelInput
                  className={cnCalendar('PeopleAmount')}
                  name='tel'
                  value={formFields.tel || ''}
                  error={!validation.tel}
                  label='Телефон'
                  onChange={onChangePhone}
                  onFocus={onFocus}
                  sx={{ marginTop: '15px' }}
                  fullWidth
        />
              <TextField
                  className={cnCalendar('PeopleAmount')}
                  type='number'
                  name='peopleAmount'
                  value={formFields.peopleAmount || ''}
                  error={!validation.peopleAmount}
                  label='Количество человек'
                  onChange={onChangeStringsFields}
                  onFocus={onFocus}
                  sx={{ marginTop: '15px' }}
                  fullWidth
        />
              <CalendarChildrenForm form={formFields.children} onChange={onChangeChildrenForm} />
              <CalendarSelectCities onChange={onChangeSelect} onFocus={onFocus} />
              <TextField
                  className={cnCalendar('Comments')}
                  type='text'
                  name='comment'
                  value={formFields.comment || ''}
                  label='Комментарий'
                  onChange={onChangeStringsFields}
                  sx={{ marginTop: '15px' }}
                  multiline
                  fullWidth
        />
              <CalendarRent onSubmit={onSubmitRent} />
          </DialogContent>
          <DialogActions>
              <Button onClick={onCancel}>
                  Отмена
              </Button>
              <Button onClick={handleSubmitClick}>
                  {submitLabel || 'Добавить'}
              </Button>
          </DialogActions>
      </Dialog>
  );
};

export default CalendarDialog;
