import { FC, memo, useCallback } from 'react';
import { Badge, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Checkbox } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { auditActions, RentPiece } from '../../lib/redux/slices/auditSlice/auditSlice.ts';
import { useAppDispatch } from '../../lib/redux/store.ts';

type RentPieceItemFCProps = RentPiece & {
  itemId: string;
}

const RentPieceItemFC: FC<RentPieceItemFCProps> = ({ itemId, id, title, price, returned, count }) => {
  const dispatch = useAppDispatch();

  const handleDeletePiece = useCallback(() => {
    dispatch(auditActions.removeRentPiece({ itemId, pieceId: id }));
  }, [dispatch, id, itemId]);

  const handleReturnPiece = useCallback(() =>
    dispatch(auditActions.checkReturnRentPiece({ itemId, pieceId: id })), []);

  return (
      <ListItem sx={{ padding: '8px 0' }}>
          <IconButton onClick={handleDeletePiece} sx={{ padding: '8px 8px 8px 0' }}>
              <HighlightOffIcon color='error' />
          </IconButton>
          <Badge badgeContent={count} color='primary'>
              <ListItemText sx={{ marginLeft: '15px' }} primary={title} />
          </Badge>
          <ListItemButton sx={{ marginLeft: '30px', justifyContent: 'flex-end' }}>
              <ListItemIcon onClick={handleReturnPiece} sx={{ justifyContent: 'flex-end' }}>
                  <Checkbox checked={returned} />
              </ListItemIcon>
          </ListItemButton>
          <ListItemText
              sx={{ minWidth: '70px' }} slotProps={{ primary: { align: 'right' } }}
              primary={`${price * count} ₽`} />
      </ListItem>
  );
};

const RentPieceItem = memo(RentPieceItemFC);

export default RentPieceItem;
