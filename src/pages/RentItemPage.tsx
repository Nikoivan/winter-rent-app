import { FC, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent, IconButton,
  List,
  Stack,
  Typography
} from '@mui/material';
import { useParams } from 'react-router';
import { cn } from '@bem-react/classname';

import { useAppSelector } from '../lib/redux/store.ts';
import RentPiece from '../components/RentPiece/RentPiece.tsx';
import SnowboardIcon from '../components/Icons/SnowboardIcon.tsx';
import SkiIcon from '../components/Icons/SkiIcon.tsx';
import { CircleOutlined } from '@mui/icons-material';
import PantsIcon from '../components/Icons/PantsIcon.tsx';
import JacketIcon from '../components/Icons/JacketIcon.tsx';
import GlassesIcon from '../components/Icons/GlassesIcon.tsx';

const cnCard = cn('Card');

const RentItemPage: FC = () => {
  const { id: itemId } = useParams();
  const { rentItems } = useAppSelector(state => state.audit);
  const item = useMemo(() => rentItems.find(item => item.id === itemId), [itemId, rentItems]);

  if (!item || !itemId) {
    throw new Error('Ошибка идентификатора');
  }

  const { items } = item;

  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + item.price, 0)
    , [items]);

  const { returnBtnDisabled, payBtnDisabled } = useMemo(() => ({
    returnBtnDisabled: item?.items.every(({ returned }) => returned),
    payBtnDisabled: item?.payed
  }), [item?.items, item?.payed]);

  return (
      <Box className={cnCard('Box')} sx={{ height: '100%' }}>
          <Stack spacing={2} direction='row'>
              <IconButton color='inherit' size='medium' sx={{ border: '1px solid' }}>
                  <SnowboardIcon />
              </IconButton>
              <IconButton color='inherit' size='medium' sx={{ border: '1px solid' }}>
                  <SkiIcon />
              </IconButton>
              <IconButton color='inherit' size='medium' sx={{ border: '1px solid' }}>
                  <CircleOutlined />
              </IconButton>
              <IconButton color='inherit' size='medium' sx={{ border: '1px solid' }}>
                  <PantsIcon />
              </IconButton>
              <IconButton color='inherit' size='medium' sx={{ border: '1px solid' }}>
                  <JacketIcon />
              </IconButton>
              <IconButton color='inherit' size='medium' sx={{ border: '1px solid' }}>
                  <GlassesIcon />
              </IconButton>
          </Stack>
          <Card sx={{ height: '100%', bgcolor: '#c4c4c4', marginTop: '15px' }}>
              <CardContent sx={{ paddingTop: '0' }}>
                  <List className={cnCard('PiecesList')}>
                      {items.map((item, idx) => (
                          <RentPiece key={idx} {...item} itemId={itemId} />
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
                  className={cnCard('Actions')}>
                  <Button color='inherit' variant='contained' disabled={returnBtnDisabled}>
                      Сдано
                  </Button>
                  <Button color='inherit' variant='contained' disabled={payBtnDisabled}>
                      Оплачено
                  </Button>
              </CardActions>
          </Card>
      </Box>
  );
};

export default RentItemPage;
