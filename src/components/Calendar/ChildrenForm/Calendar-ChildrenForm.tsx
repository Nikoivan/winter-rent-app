import { ChangeEvent, FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { ChildrenData } from '../lib/calendar.types.ts';

type CalendarChildrenFormProps = {
  form?: ChildrenData;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

const cnCalendar = cn('Calendar');

const CalendarChildrenForm: FC<CalendarChildrenFormProps> = ({ form, onChange }) => {
  const [hasChildren, setChildren] = useState<boolean>(false);
  const onCheckboxChange = () => setChildren(!hasChildren);

  return (
      <div className={cnCalendar('ChildrenForm')}>
          <FormControlLabel
              control={<Checkbox name='children' checked={hasChildren} onChange={onCheckboxChange} />}
              label='Имеются дети'
              sx={{ marginTop: '15px' }}
      />
          {hasChildren && (
          <>
              <TextField
                  name='count'
                  value={form?.count || ''}
                  label='Количество детей'
                  onChange={onChange}
                  sx={{ marginTop: '15px' }}
                  fullWidth
          />
              <TextField
                  name='age'
                  value={form?.age || ''}
                  label='Возраст детей'
                  onChange={onChange}
                  sx={{ marginTop: '15px' }}
                  fullWidth
          />
              <FormControlLabel
                  control={<Checkbox name='needChildSeat' checked={form?.needChildSeat || false} onChange={onChange} />}
                  label='Детское кресло'
                  sx={{ marginTop: '15px' }}
          />
          </>
      )}
      </div>
  );
};

export default CalendarChildrenForm;
