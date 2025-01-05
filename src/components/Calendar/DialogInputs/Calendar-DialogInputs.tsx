import { ChangeEvent, FC, FocusEvent } from 'react';
import { TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { cn } from '@bem-react/classname';
import { RecordType, ValidationResult } from '../lib/calendar.types';

type CalendarDialogInputProps = {
  formFields: Partial<RecordType>;
  validation: ValidationResult;
  onChangeStringsFields(e: ChangeEvent<HTMLInputElement>): void;
  onChangePhone(tel: string): void;
  onFocus(e: FocusEvent<HTMLInputElement>): void;
};

const cnCalendar = cn('Calendar');

const CalendarDialogInputs: FC<CalendarDialogInputProps> = ({
  formFields,
  validation,
  onChangeStringsFields,
  onChangePhone,
  onFocus
}) => (
    <>
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
    </>
);

export default CalendarDialogInputs;
