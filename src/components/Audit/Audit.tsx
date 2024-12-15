import {FC, useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router';
import {cn} from '@bem-react/classname';
import {List, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import {useAppDispatch, useAppSelector} from '../../lib/redux/store.ts';
import {AuditTabs} from '../../lib/redux/slices/auditSlice/auditSlice.types.ts';
import {auditActions} from '../../lib/redux/slices/auditSlice/auditSlice.ts';
import CustomTabPanel from '../CustomTabPanel/CustomTabPanel.tsx';

const tabs = [
		{label: 'Активно', value: AuditTabs.ACTIVE},
		{label: 'Сдано', value: AuditTabs.RETURNED},
];
const cnAudit = cn('Audit');

const Audit: FC = () => {
		const {activeTab, rentItems} = useAppSelector((state) => state.audit);
		const dispatch = useAppDispatch();
		const navigate = useNavigate();

		const activeItems = useMemo(() => rentItems
				.filter(({items}) => items.every(({returned}) => !returned)), [rentItems]);

		const handleTabChange = useCallback(() => {
				dispatch(auditActions.selectTab({
						tab: activeTab === AuditTabs.ACTIVE ? AuditTabs.RETURNED : AuditTabs.ACTIVE,
				}));
		}, [activeTab, dispatch]);

		const handleItemCLick = useCallback(async (id: string) => {
				await navigate(`${id}`);
		}, [navigate]);

		return (
    <div className={cnAudit()}>
        <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
            {tabs.map((tab, idx) => (
                <Tab key={idx} {...tab} />))}
        </Tabs>
        {tabs.map(({value}, idx) => (
            <CustomTabPanel activateValue={value} value={activeTab} key={idx}>
                {!!activeItems.length && (
                <List>
                    {activeItems.map(({id, contactInfo: {clientName, clientPhone}}, idx) => (
                        <ListItemButton key={idx} onClick={() => handleItemCLick(id)}>
                            <ListItemAvatar>
                                <PersonIcon />
                            </ListItemAvatar>
                            <ListItemText primary={clientName} secondary={
                                <Typography variant='body1' color='info'>
                                    {clientPhone}
                                </Typography>
																		} />
                        </ListItemButton>))}
                </List>
										)}
            </CustomTabPanel>
						))}
    </div>
		);
};

export default Audit;