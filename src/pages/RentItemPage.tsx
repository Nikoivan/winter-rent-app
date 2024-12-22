import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/material';

import { useAppSelector } from '../lib/redux/store.ts';
import PiecesControl from '../components/PiecesControl/PiecesControl.tsx';
import RentCard from '../components/RentCard/RentCard.tsx';
import { RentPieceType } from '../lib/redux/slices/auditSlice/auditSlice.types.ts';

const RentItemPage: FC = () => {
  const [items, setItems] = useState<RentPieceType[] | null>(null);
  const { id: itemId } = useParams();
  const { rentItems } = useAppSelector(state => state.audit);
  const navigate = useNavigate();
  const item = rentItems.find(item => item.id === itemId);

  useEffect(() => {
    (async () => {
      if (item && !items) {
        setItems(item.items);
      } else {
        await navigate('/winter-rent-crm');
      }
    })();
  }, []);

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
