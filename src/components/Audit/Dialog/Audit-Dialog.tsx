import { ChangeEvent, FC, useState } from 'react';
import { cn } from '@bem-react/classname';
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

import { ContactInfo, Drivers } from '../../../lib/redux/slices/auditSlice/auditSlice.types.ts';
import { isContactInfo, isDrivers, isKeyofContactInfo } from '../../../lib/typeguards.ts';
import { MuiTelInput } from 'mui-tel-input';

type AuditModalProps = {
  open: boolean;
  onCancel(): void;
  onSubmit(contactInfo: ContactInfo): void;
};

type FormState = {
  clientName: string;
  clientPhone: string;
  driver: Drivers | '';
};

const cnAudit = cn('Audit');
const initFormState: FormState = {
  clientName: '',
  clientPhone: '',
  driver: ''
};

const AuditDialog: FC<AuditModalProps> = ({ open, onCancel, onSubmit }) => {
  const [form, setForm] = useState<FormState>(initFormState);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (!isKeyofContactInfo(name)) {
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePhone = (clientPhone: string) => {
    setForm(prev => ({ ...prev, clientPhone }));
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const { value } = e.target;

    if (!isDrivers(value)) {
      return;
    }

    setForm(prev => ({ ...prev, driver: value }));
  };

  const createBtnDisabled = Object.values(form).some(value => !value);

  const handleSubmitClick = () => {
    const contactInfo = !createBtnDisabled && { ...form };

    if (!isContactInfo(contactInfo)) {
      return;
    }

    onSubmit(contactInfo);
    setForm(initFormState);
  };

  return (
      <Dialog className={cnAudit('Dialog')} open={open}>
          <DialogTitle sx={{ textAlign: 'center' }}>
              Добавить арендатора
          </DialogTitle>
          <DialogContent sx={{ padding: '1rem', minWidth: '70vw', minHeight: '55vh' }}>
              <TextField
                  onChange={handleChangeInput}
                  sx={{ mt: 3 }}
                  value={form.clientName}
                  label='Имя'
                  variant='outlined'
                  name='clientName'
                  fullWidth
        />
              <MuiTelInput
                  onChange={handleChangePhone}
                  sx={{ mt: 4 }}
                  value={form.clientPhone}
                  label='Телефон'
                  variant='outlined'
                  name='clientPhone'
                  fullWidth
        />
              <FormControl sx={{ mt: 4 }}>
                  <InputLabel id='drivers'>
                      Водитель
                  </InputLabel>
                  <Select
                      value={form.driver}
                      label='Водитель'
                      labelId='drivers'
                      onChange={handleChangeSelect}
                      sx={{ minWidth: '200px' }}
          >
                      <MenuItem value=''>
                          <em>
                              Не выбрано
                          </em>
                      </MenuItem>
                      {Object.entries(Drivers).map(([key, value]: string[]) => (
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
              <Button onClick={handleSubmitClick} disabled={createBtnDisabled} autoFocus>
                  Создать
              </Button>
          </DialogActions>
      </Dialog>
  );
};

export default AuditDialog;
