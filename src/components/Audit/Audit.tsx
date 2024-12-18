import { FC, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton, Stack, Tab, Tabs } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useAppDispatch, useAppSelector } from '../../lib/redux/store.ts';
import { AuditTabs, ContactInfo } from '../../lib/redux/slices/auditSlice/auditSlice.types.ts';
import { auditActions } from '../../lib/redux/slices/auditSlice/auditSlice.ts';
import AuditList from './List/Audit-List.tsx';
import CustomTabPanel from '../CustomTabPanel/CustomTabPanel.tsx';
import AuditDialog from './Dialog/Audit-Dialog.tsx';
import { v4 } from 'uuid';

const tabs = [
  { label: 'Активно', value: AuditTabs.ACTIVE },
  { label: 'Сдано', value: AuditTabs.RETURNED }
];
const cnAudit = cn('Audit');

const Audit: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { activeTab, rentItems } = useAppSelector(state => state.audit);
  const dispatch = useAppDispatch();

  const [activeItems, returnedItems] = useMemo(
    () => [
      rentItems.filter(({ items }) => !items.length || items.every(({ returned }) => !returned)),
      rentItems.filter(({ items }) => !!items.length && items.every(({ returned, payed }) => returned && payed))
    ],
    [rentItems]
  );

  const handleOpenDialog = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const handleTabChange = useCallback(() => {
    dispatch(
      auditActions.selectTab({
        tab: activeTab === AuditTabs.ACTIVE ? AuditTabs.RETURNED : AuditTabs.ACTIVE
      })
    );
  }, [activeTab, dispatch]);

  const handleCloseClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmitClick = useCallback(
    (contactInfo: ContactInfo) => {
      setOpen(false);
      dispatch(auditActions.addRentItem({ id: v4(), contactInfo }));
    },
    [dispatch]
  );

  return (
      <div className={cnAudit()}>
          <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton onClick={handleOpenDialog}>
                  <AddCircleOutlineIcon color='primary' fontSize='large' />
              </IconButton>
              <Tabs value={activeTab} onChange={handleTabChange} textColor='inherit'>
                  {tabs.map((tab, idx) => (
                      <Tab key={idx} {...tab} />
          ))}
              </Tabs>
          </Stack>
          <CustomTabPanel activateValue={AuditTabs.ACTIVE} value={activeTab}>
              {!!activeItems.length && <AuditList items={activeItems} />}
          </CustomTabPanel>
          <CustomTabPanel activateValue={AuditTabs.RETURNED} value={activeTab}>
              {!!returnedItems.length && <AuditList items={returnedItems} />}
          </CustomTabPanel>
          <AuditDialog open={isOpen} onSubmit={handleSubmitClick} onCancel={handleCloseClick} />
      </div>
  );
};

export default Audit;
