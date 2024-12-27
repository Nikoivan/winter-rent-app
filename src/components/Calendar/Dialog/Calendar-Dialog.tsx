import { cn } from '@bem-react/classname';
import { ChangeEvent, FocusEvent, FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { Cities, RecordType, ValidationResult } from '../lib/calendar.types.ts';
import { isCities, isRecordType } from '../lib/typeguards.ts';
import { validateForm } from '../lib/calendar.utils.ts';
import { v4 } from 'uuid';
import { MuiTelInput } from 'mui-tel-input';

type CalendarDialogProps = {
  isOpen: boolean;
  onSubmit(formFields: RecordType): void;
  onCancel: () => void;
};

const cnCalendar = cn('Calendar');
const initialFormFields = { name: '', tel: '', peopleAmount: 0 };

const CalendarDialog: FC<CalendarDialogProps> = ({ isOpen, onSubmit, onCancel }) => {
  const [formFields, setFormFields] = useState<Partial<RecordType>>(initialFormFields);
  const [validation, setValidation] = useState<ValidationResult>({
    name: true,
    tel: true,
    peopleAmount: true,
    city: true
  });

  const handleChangeStringsFields = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormFields(prev => ({ ...prev, [name]: name === 'peopleAmount' || name === 'tel' ? Number(value) : value }));
  };

  const handleChangePhone = (tel: string) => {
    setFormFields(prev => ({ ...prev, tel }));
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    if (name !== 'city' || !isCities(value)) {
      return;
    }

    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (!validation[name as keyof ValidationResult]) {
      setValidation(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmitClick = () => {
    const validationResult = validateForm(formFields);

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

  return (
      <Dialog className={cnCalendar('Dialog')} open={isOpen} onClose={onCancel}>
          <DialogTitle>
              Добавить запись
          </DialogTitle>
          <DialogContent>
              <TextField
                  className={cnCalendar('Name')}
                  type='text'
                  name='name'
                  value={formFields.name}
                  error={!validation.name}
                  label='Имя'
                  onChange={handleChangeStringsFields}
                  onFocus={handleFocus}
                  sx={{ marginTop: '15px' }}
                  fullWidth
        />
              <MuiTelInput
                  className={cnCalendar('PeopleAmount')}
                  name='tel'
                  value={formFields.tel || ''}
                  error={!validation.tel}
                  label='Телефон'
                  onChange={handleChangePhone}
                  onFocus={handleFocus}
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
                  onChange={handleChangeStringsFields}
                  onFocus={handleFocus}
                  sx={{ marginTop: '15px' }}
                  fullWidth
        />
              <FormControl fullWidth sx={{ marginTop: '15px' }}>
                  <InputLabel id='city'>
                      Город
                  </InputLabel>
                  <Select
                      className={cnCalendar('Cities')}
                      name='city'
                      value={formFields.city || ''}
                      error={!validation.city}
                      labelId='city'
                      label='Город'
                      onChange={handleChangeSelect}
                      onFocus={handleFocus}
          >
                      <MenuItem value=''>
                          <em>
                              Не указано
                          </em>
                      </MenuItem>
                      {Object.entries(Cities).map(([key, value]: string[]) => (
                          <MenuItem value={value} key={value}>
                              {key}
                          </MenuItem>
            ))}
                  </Select>
              </FormControl>
          </DialogContent>
          <DialogActions>
              <Button onClick={onCancel}>
                  Отмена
              </Button>
              <Button onClick={handleSubmitClick}>
                  Добавить
              </Button>
          </DialogActions>
      </Dialog>
  );
};

export default CalendarDialog;
