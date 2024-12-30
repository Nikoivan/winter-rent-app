import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import { RecordType } from '../lib/calendar.types.ts';
import { calendarActions } from '../lib/calendarSlice.ts';
import { useAppDispatch } from '../../../lib/redux/store.ts';
import TelAnchor from '../../Anchor/TelAnchor.tsx';
import CalendarDialog from '../Dialog/Calendar-Dialog.tsx';

type CalendarItemProps = RecordType & { date: string };

const cnCalendar = cn('Calendar');

const CalendarItem: FC<CalendarItemProps> = ({ id, name, tel, peopleAmount, date, ...props }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onClickOpen = () => setOpen(!isOpen);
  const onDelete = () => {
    dispatch(calendarActions.removeRecord({ date, id }));
  };
  const onChange = (record: RecordType) => {
    dispatch(calendarActions.patchRecord({ date, id, record }));
  };

  return (
      <>
          <ListItem
              className={cnCalendar('Item')}
              secondaryAction={
                  <IconButton onClick={onClickOpen} sx={{ color: '#fff' }}>
                      <InsertCommentIcon color='inherit' />
                  </IconButton>
        }
      >
              <IconButton onClick={onDelete} sx={{ marginRight: '15px' }}>
                  <HighlightOffIcon color='error' />
              </IconButton>
              <ListItemText
                  primary={`${name} - ${peopleAmount} человек`}
                  secondary={<TelAnchor tel={tel} />}
                  slotProps={{ secondary: { fontSize: 'large', color: 'info' } }}
        />
          </ListItem>
          <CalendarDialog
              isOpen={isOpen}
              formData={{ id, name, tel, peopleAmount, ...props }}
              submitLabel='Сохранить'
              onSubmit={onChange}
              onCancel={onClickOpen}
      />
      </>
  );
};

export default CalendarItem;
