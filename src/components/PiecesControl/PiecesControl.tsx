import { BaseSyntheticEvent, FC, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton, Stack } from '@mui/material';
import { CircleOutlined } from '@mui/icons-material';

import { RentTypes } from '../../lib/redux/slices/auditSlice/auditSlice.types.ts';
import { auditActions } from '../../lib/redux/slices/auditSlice/auditSlice.ts';
import { useAppDispatch } from '../../lib/redux/store.ts';
import { isRentType } from '../../lib/typeguards.ts';
import SnowboardIcon from '../Icons/SnowboardIcon.tsx';
import SkiIcon from '../Icons/SkiIcon.tsx';
import PantsIcon from '../Icons/PantsIcon.tsx';
import JacketIcon from '../Icons/JacketIcon.tsx';
import GlassesIcon from '../Icons/GlassesIcon.tsx';

import './PiecesControl.scss';

type PiecesControlProps = {
  itemId: string;
};

const piecesItems = [
  {
    type: RentTypes.SNOWBOARD,
    Icon: SnowboardIcon
  },
  {
    type: RentTypes.SKI,
    Icon: SkiIcon
  },
  {
    type: RentTypes.TUBING,
    Icon: CircleOutlined
  },
  {
    type: RentTypes.PANTS,
    Icon: PantsIcon
  },
  {
    type: RentTypes.JACKET,
    Icon: JacketIcon
  },
  {
    type: RentTypes.GLASSES,
    Icon: GlassesIcon
  }
];

const cnPiecesControl = cn('PiecesControl');

const PiecesControl: FC<PiecesControlProps> = ({ itemId }) => {
  const dispatch = useAppDispatch();

  const handleAddPiece = useCallback(
    (e: BaseSyntheticEvent) => {
      const { name } = e.currentTarget;

      if (!isRentType(name)) {
        return;
      }

      dispatch(auditActions.addRentPiece({ itemId, type: name }));
    },
    [dispatch, itemId]
  );

  return (
      <Stack className={cnPiecesControl()} spacing={2} direction='row'>
          {piecesItems.map(({ type, Icon }, idx) => (
              <IconButton
                  className={cnPiecesControl('Button')}
                  name={type}
                  color='inherit'
                  size='medium'
                  sx={{ border: '1px solid' }}
                  key={idx}
                  onClick={handleAddPiece}
        >
                  <Icon />
              </IconButton>
      ))}
      </Stack>
  );
};

export default PiecesControl;
