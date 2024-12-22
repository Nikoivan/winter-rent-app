import { FC } from 'react';
import { useParams } from 'react-router';
import { cn } from '@bem-react/classname';
import { IconButton, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useAppSelector } from '../lib/redux/store.ts';
import PageHeader from '../components/PageHeader/PageHeader.tsx';

const cnCalendarItemPage = cn('CalendarItemPage');
const cnCalendarRecords = cn('CalendarRecords');

const CalendarItemPage: FC = () => {
  const { days } = useAppSelector(state => state.calendar);
  const { id } = useParams();
  const day = !!days.length && days.find(({ date }) => date === id);

  return (
      <div className={cnCalendarItemPage()}>
          <PageHeader title={`Запись на ${id}`} />
          <Stack className={cnCalendarRecords('Control')} sx={{ justifyContent: 'flex-start' }}>
              <IconButton sx={{ maxWidth: '50px' }}>
                  <AddCircleOutlineIcon color='primary' fontSize='large' />
              </IconButton>
          </Stack>
          <span>
              Content
          </span>
      </div>
  );
};

export default CalendarItemPage;
