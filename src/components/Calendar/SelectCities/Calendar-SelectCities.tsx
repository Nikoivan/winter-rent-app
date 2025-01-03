import { cn } from '@bem-react/classname';
import { FC, FocusEvent } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Cities } from '../lib/calendar.types.ts';

type CalendarSelectCitiesProps = {
  value?: string;
  invalid?: boolean;
  onChange: (e: SelectChangeEvent) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
};

const cnCalendar = cn('Calendar');

const CalendarSelectCities: FC<CalendarSelectCitiesProps> = ({ value, invalid, onChange, onFocus }) => (
    <FormControl fullWidth sx={{ marginTop: '15px' }}>
        <InputLabel id='city'>
            Город
        </InputLabel>
        <Select
            className={cnCalendar('Cities')}
            name='city'
            value={value || ''}
            error={invalid}
            labelId='city'
            label='Город'
            onChange={onChange}
            onFocus={onFocus}
    >
            <MenuItem value=''>
                <em>
                    Не указано
                </em>
            </MenuItem>
            {Object.entries(Cities).map(([key, value]: string[]) => (
                <MenuItem value={key} key={key}>
                    {value}
                </MenuItem>
      ))}
        </Select>
    </FormControl>
);

export default CalendarSelectCities;
