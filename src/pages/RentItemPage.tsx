import { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/material';

import { useAppSelector } from '../lib/redux/store.ts';
import PiecesControl from '../components/PiecesControl/PiecesControl.tsx';
import RentCard from '../components/RentCard/RentCard.tsx';

const RentItemPage: FC = () => {
  const { id: itemId } = useParams();
  const { rentItems } = useAppSelector(state => state.audit);
  const navigate = useNavigate();
  const item = useMemo(() => rentItems.find(item => item.id === itemId), [itemId, rentItems]);

  if (!item || !itemId) {
    throw new Error('Ошибка идентификатора');
  }

  const { items } = item || { items: [] };

  useEffect(() => {
    (async () => {
      if (!item) {
        await navigate('/.');
      }
    })();
  }, [item, navigate]);

  return (
      <Box sx={{ height: '100%' }}>
          <PiecesControl itemId={itemId} />
          <RentCard item={item} itemId={itemId} items={items} />
      </Box>
  );
};

export default RentItemPage;
