import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
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

const AuditDialog: FC<AuditModalProps> = ({ open, onCancel, onSubmit }) => {
  const [form, setForm] = useState<FormState>({
    clientName: '',
    clientPhone: '',
    driver: ''
  });

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (!isKeyofContactInfo(name)) {
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleChangeSelect = useCallback((e: SelectChangeEvent) => {
    const { value } = e.target;

    if (!isDrivers(value)) {
      return;
    }

    setForm(prev => ({ ...prev, driver: value }));
  }, []);

  const createBtnDisabled = useMemo(() => Object.values(form).some(value => !value), [form]);

  const handleSubmitClick = useCallback(() => {
    const contactInfo = !createBtnDisabled && { ...form };

    if (!isContactInfo(contactInfo)) {
      return;
    }

    onSubmit(contactInfo);
  }, [createBtnDisabled, form, onSubmit]);

  return (
      <Dialog className={cnAudit('Dialog')} open={open}>
          <DialogTitle sx={{ textAlign: 'center' }}>
              Добавить арендатора
          </DialogTitle>
          <DialogContent sx={{ padding: '1rem', minWidth: '70vw', minHeight: '70vh' }}>
              <TextField
                  onChange={handleChangeInput}
                  sx={{ mt: 3 }}
                  value={form.clientName}
                  label='Имя'
                  variant='outlined'
                  name='clientName'
                  fullWidth
        />
              <TextField
                  onChange={handleChangeInput}
                  sx={{ mt: 4 }}
                  value={form.clientPhone}
                  label='Телефон'
                  variant='outlined'
                  type='number'
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
