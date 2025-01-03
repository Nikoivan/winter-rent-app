import { cn } from '@bem-react/classname';
import { FC, FocusEvent } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type CalendarRentSelectProps = {
  options: [string, string][];
  value: string;
  name: string;
  invalid?: boolean;
  title?: string;
  onChange: (e: SelectChangeEvent) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
};

const cnCalendar = cn('Calendar');

const CalendarRentSelect: FC<CalendarRentSelectProps> = ({
  options,
  value,
  name,
  invalid,
  title,
  onChange,
  onFocus
}) => (
    <FormControl fullWidth sx={{ marginTop: '15px' }}>
        <InputLabel id='rentName'>
            {title || 'Наименование'}
        </InputLabel>
        <Select
            className={cnCalendar('Select')}
            name={name}
            value={value}
            error={invalid}
            labelId={name}
            label={title || 'Наименование'}
            onChange={onChange}
            onFocus={onFocus}
    >
            <MenuItem value=''>
                <em>
                    Не указано
                </em>
            </MenuItem>
            {options.map(([key, value]) => (
                <MenuItem value={value} key={key}>
                    {value}
                </MenuItem>
      ))}
        </Select>
    </FormControl>
);

export default CalendarRentSelect;
