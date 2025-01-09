import { FC } from 'react';
import { cn } from '@bem-react/classname';
import {
  Badge,
  Button,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { auditActions } from '../../lib/redux/slices/auditSlice/auditSlice.ts';
import { useAppDispatch } from '../../lib/redux/store.ts';
import { RentPieceActionTypes, RentPieceType } from '../../lib/redux/slices/auditSlice/auditSlice.types.ts';

import './RentPiece.scss';

type RentPieceItemFCProps = RentPieceType & {
  itemId: string;
};

const cnRentPieceItem = cn('RentPieceItem');

const RentPieceItem: FC<RentPieceItemFCProps> = ({ itemId, id, title, price, returned, payed, count }) => {
  const dispatch = useAppDispatch();

  const onRemoveClick = () =>
    dispatch(auditActions.checkChangeRentPiece({ itemId, pieceId: id, actionType: RentPieceActionTypes.DELETE }));
  const onPayClick = () =>
    dispatch(
      auditActions.checkChangeRentPiece({
        itemId,
        pieceId: id,
        actionType: RentPieceActionTypes.PAY
      })
    );
  const onReturnClick = () =>
    dispatch(
      auditActions.checkChangeRentPiece({
        itemId,
        pieceId: id,
        actionType: RentPieceActionTypes.RETURN
      })
    );

  return (
      <ListItem className={cnRentPieceItem()} sx={{ padding: '8px 0' }}>
          <IconButton onClick={onRemoveClick} sx={{ padding: '8px 8px 8px 0' }}>
              <HighlightOffIcon color='error' />
          </IconButton>
          <Badge badgeContent={count} color='primary'>
              <ListItemText sx={{ marginLeft: '15px' }} primary={title} />
          </Badge>
          <ListItemButton sx={{ marginLeft: '30px', justifyContent: 'flex-end' }}>
              <ListItemIcon onClick={onReturnClick} sx={{ justifyContent: 'flex-end' }}>
                  <Checkbox checked={returned} />
              </ListItemIcon>
          </ListItemButton>
          <ListItemText
              className={cnRentPieceItem('Text')}
              sx={{ minWidth: '70px' }}
              slotProps={{ primary: { align: 'right' } }}
              primary={
                  <Button className={cnRentPieceItem('PayBtn', { payed })} onClick={onPayClick} color='inherit' variant='text'>
                      {`${price * count} ₽`}
                  </Button>
        }
      />
      </ListItem>
  );
};

export default RentPieceItem;
