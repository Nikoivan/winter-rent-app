import { ChangeEvent, FC, FocusEvent, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { RentFormFields, RentPieceNames } from '../../../lib/redux/slices/calendarSlice/calendar.types.ts';
import CalendarRentSelect from '../RentSelect/Calendar-RentSelect.tsx';
import { isKeyofRentFormFields } from '../../../lib/redux/slices/calendarSlice/typeguards.ts';
import { validateRentForm } from '../../../lib/redux/slices/calendarSlice/calendar.utils.ts';

type CalendarRentProps = {
  onSubmit(rentPieces: Partial<RentFormFields>): void;
};

const cnCalendar = cn('Calendar');
const initState: RentFormFields = { name: '', gender: '', height: '', size: '', amount: '' };
const initValidation = { name: true, gender: true, height: true, size: true, amount: true };
const TITLE = 'Прокат';

const CalendarRent: FC<CalendarRentProps> = ({ onSubmit }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<RentFormFields>(initState);
  const [validation, setValidation] = useState<Record<keyof RentFormFields, boolean>>(initValidation);
  const { name, gender, height, size, amount } = state;

  const onChangeSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setState(prev => ({ ...prev, [name]: value }));
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setState(prev => ({ ...prev, [name]: Number(value) }));
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const isValidationKey = isKeyofRentFormFields(name);

    if ((isValidationKey && validation[name]) || !isValidationKey) {
      return;
    }

    setValidation(prev => ({ ...prev, [name]: true }));
  };

  const onClickBtn = () => setOpen(true);
  const onSubmitClick = () => {
    const validationResult = validateRentForm(state);

    if (Object.values(validationResult).some(item => !item)) {
      setValidation(validationResult);

      return;
    }

    if (onSubmit) {
      onSubmit(Object.assign(state));
    }
    setState(initState);
    setOpen(false);
  };

  const onCancel = () => {
    setState(initState);
    setValidation(initValidation);
    setOpen(false);
  };

  return (
      <>
          <Button className={cnCalendar('Rent')} onClick={onClickBtn} startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2 }}>
              {TITLE}
          </Button>
          <Dialog open={isOpen} onClose={onCancel}>
              <DialogTitle>
                  {TITLE}
              </DialogTitle>
              <DialogContent>
                  <CalendarRentSelect
                      options={Object.entries(RentPieceNames)}
                      value={name}
                      name='name'
                      invalid={!validation.name}
                      onChange={onChangeSelect}
                      onFocus={onFocus}
          />
                  {name !== RentPieceNames.TUBING && (
                  <>
                      <CalendarRentSelect
                          options={[
                  ['MAN', 'М'],
                  ['WOMEN', 'Ж']
                ]}
                          value={gender}
                          name='gender'
                          title='Пол'
                          invalid={!validation.gender}
                          onChange={onChangeSelect}
                          onFocus={onFocus}
              />
                      <TextField
                          value={height}
                          name='height'
                          label='Рост'
                          type='number'
                          error={!validation.height}
                          onChange={onChangeInput}
                          sx={{ mt: 2 }}
                          fullWidth
              />
                      <TextField
                          value={size}
                          name='size'
                          label='Размер'
                          type='number'
                          error={!validation.size}
                          onChange={onChangeInput}
                          onFocus={onFocus}
                          sx={{ mt: 2 }}
                          fullWidth
              />
                  </>
          )}
                  {name === RentPieceNames.TUBING && (
                  <TextField
                      value={amount}
                      name='amount'
                      label='Количество'
                      type='number'
                      error={!validation.amount}
                      onChange={onChangeInput}
                      onFocus={onFocus}
                      sx={{ mt: 2 }}
                      fullWidth
            />
          )}
              </DialogContent>
              <DialogActions>
                  <Button onClick={onCancel}>
                      Отмена
                  </Button>
                  <Button onClick={onSubmitClick}>
                      Добавить
                  </Button>
              </DialogActions>
          </Dialog>
      </>
  );
};

export default CalendarRent;
