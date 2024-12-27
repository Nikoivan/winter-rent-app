import { FC } from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';

import { useAppSelector } from '../lib/redux/store.ts';
import PiecesControl from '../components/PiecesControl/PiecesControl.tsx';
import RentCard from '../components/RentCard/RentCard.tsx';

const RentItemPage: FC = () => {
  const { id: itemId } = useParams();
  const { rentItems } = useAppSelector(state => state.audit);
  const item = rentItems.find(item => item.id === itemId);
  const items = item?.items;

  if (!item || !items) {
    return;
  }

  return (
      <>
          {!!itemId && !!item && items && (
          <Box sx={{ height: '100%' }}>
              <PiecesControl itemId={itemId} />
              <RentCard item={item} itemId={itemId} items={items} />
          </Box>
      )}
      </>
  );
};

export default RentItemPage;
