import { FC, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router';
import { cn } from '@bem-react/classname';
import { Box, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useAppDispatch, useAppSelector } from '../lib/redux/store.ts';
import PageHeader from '../components/PageHeader/PageHeader.tsx';
import CalendarDialog from '../components/Calendar/Dialog/Calendar-Dialog.tsx';
import { Cities, RecordType } from '../components/Calendar/lib/calendar.types.ts';
import { calendarActions } from '../components/Calendar/lib/calendarSlice.ts';
import CalendarList from '../components/Calendar/List/Calendar-List.tsx';
import { getCitiesTabs } from '../components/Calendar/lib/calendar.utils.ts';
import { isCities } from '../components/Calendar/lib/typeguards.ts';

const cnCalendar = cn('Calendar');
const cnCalendarItemPage = cn('CalendarItemPage');
const cnCalendarRecords = cn('CalendarRecords');

const CalendarItemPage: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [activeCity, setActiveCity] = useState<Cities | undefined>(undefined);
  const { days } = useAppSelector(state => state.calendar);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  if (!id) {
    return;
  }

  const day = days.find(({ date }) => date === id);
  const tabs = getCitiesTabs(day);
  const itemsByTab = day?.records.filter(({ city }) => city === activeCity || (!!tabs.length && city === tabs[0]));

  const handleOpenDialog = () => setOpen(!isOpen);
  const handleChangeTabs = (_e: SyntheticEvent, newValue: string) => {
    if (!isCities(newValue)) {
      return;
    }

    setActiveCity(newValue);
  };
  const handleSubmit = (formFields: RecordType) => {
    dispatch(calendarActions.addRecord({ date: id, record: formFields }));

    handleOpenDialog();

    if (!day?.records.length) {
      setActiveCity(formFields.city);
    }
  };

  return (
      <div className={cnCalendarItemPage()}>
          <PageHeader title={`Запись на ${id}`} />
          <Stack className={cnCalendarRecords('Control')} sx={{ justifyContent: 'flex-start' }}>
              <IconButton onClick={handleOpenDialog} sx={{ maxWidth: '50px' }}>
                  <AddCircleOutlineIcon color='primary' fontSize='large' />
              </IconButton>
          </Stack>
          {!!tabs.length && (
          <>
              <Box sx={{ maxWidth: '100%' }}>
                  <Tabs onChange={handleChangeTabs} value={activeCity || tabs[0]} variant='scrollable' scrollButtons='auto'>
                      {tabs.map((tab, idx) => (
                          <Tab
                              value={tab}
                              label={
                                  <Typography className={cnCalendar('Label')} color={activeCity === tab ? 'primary' : 'inherit'}>
                                      {tab}
                                  </Typography>
                  }
                              key={idx}
                              sx={{ color: '#fff' }}
                />
              ))}
                  </Tabs>
              </Box>
              {!!itemsByTab?.length && <CalendarList date={id} items={itemsByTab} />}
          </>
      )}

          <CalendarDialog isOpen={isOpen} onSubmit={handleSubmit} onCancel={handleOpenDialog} />
      </div>
  );
};

export default CalendarItemPage;
