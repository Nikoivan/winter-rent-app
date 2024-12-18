import { FC, useCallback } from 'react';
import { ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';

import { RentItem } from '../../../lib/redux/slices/auditSlice/auditSlice.types.ts';

const AuditItem: FC<RentItem> = ({ id, contactInfo: { clientPhone, clientName } }) => {
  const navigate = useNavigate();
  const handleItemCLick = useCallback(async () => {
    await navigate(`${id}`);
  }, [id, navigate]);

  return (
      <ListItemButton onClick={handleItemCLick}>
          <ListItemAvatar>
              <PersonIcon />
          </ListItemAvatar>
          <ListItemText
              primary={clientName}
              secondary={
                  <Typography variant='body1' color='info'>
                      {clientPhone}
                  </Typography>
        }
      />
      </ListItemButton>
  );
};

export default AuditItem;
