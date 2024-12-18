import { cn } from '@bem-react/classname';
import { FC, useCallback, useMemo } from 'react';
import { Button, Card, CardActions, CardContent, List, Stack, Typography } from '@mui/material';

import { auditActions } from '../../lib/redux/slices/auditSlice/auditSlice.ts';
import { useAppDispatch } from '../../lib/redux/store.ts';
import RentPiece from '../RentPiece/RentPiece.tsx';
import { RentItem, RentPieceType } from '../../lib/redux/slices/auditSlice/auditSlice.types.ts';

type RentCardProps = {
  item: RentItem;
  itemId: string;
  items: RentPieceType[];
};

const cnRentCard = cn('RentCard');

const RentCard: FC<RentCardProps> = ({ item, itemId, items }) => {
  const dispatch = useAppDispatch();

  const handleAllReturned = useCallback(() => {
    dispatch(auditActions.checkReturnAllRentPieces({ id: itemId }));
  }, [dispatch, itemId]);

  const handleAllPayed = useCallback(() => {
    dispatch(auditActions.checkPayItem({ id: itemId }));
  }, [dispatch, itemId]);

  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + item.price * item.count, 0), [items]);
  const { returnBtnDisabled, payBtnDisabled } = useMemo(
    () => ({
      returnBtnDisabled: !item?.items.length || item?.items.every(({ returned }) => returned),
      payBtnDisabled: item?.payed || !item?.items.length
    }),
    [item?.items, item?.payed]
  );

  return (
      <Card sx={{ height: '100%', bgcolor: '#c4c4c4', marginTop: '15px' }}>
          <CardContent sx={{ paddingTop: '0' }}>
              <List className={cnRentCard('PiecesList')}>
                  {items.map(item => (
                      <RentPiece key={item.id} {...item} itemId={itemId} />
          ))}
              </List>
              <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography gutterBottom variant='h5' component='div' color='textPrimary'>
                      Итого
                  </Typography>
                  <Typography gutterBottom variant='h6' component='div' color='textPrimary'>
                      {`${totalPrice} ₽`}
                  </Typography>
              </Stack>
          </CardContent>
          <CardActions
              sx={{ color: '#646cff', display: 'flex', justifyContent: 'flex-end' }}
              className={cnRentCard('Actions')}
      >
              <Button onClick={handleAllReturned} color='inherit' variant='contained' disabled={returnBtnDisabled}>
                  Сдано
              </Button>
              <Button onClick={handleAllPayed} color='inherit' variant='contained' disabled={payBtnDisabled}>
                  Оплачено
              </Button>
          </CardActions>
      </Card>
  );
};

export default RentCard;
