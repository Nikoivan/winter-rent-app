import { FC, SyntheticEvent, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Tab, Tabs } from '@mui/material';

import ReportsRent from './Rent/Reports-Rent.tsx';

import './Reports.scss';

type TabListItem = { title: string; value: string };

const tabsList: TabListItem[] = [
  { title: 'Прокат', value: 'rent' },
  { title: 'Записи', value: 'records' },
  { title: 'Водители', value: 'drivers' }
];
const cnReports = cn('Reports');

const ReportsAsync: FC = () => {
  const [activeTab, setActiveTab] = useState<TabListItem>(tabsList[0]);

  const onChangeTabs = (_e: SyntheticEvent, newValue: string) => {
    const tabItem = tabsList.find(({ value }) => value === newValue);

    if (!tabItem) {
      return;
    }

    setActiveTab(tabItem);
  };

  return (
      <div className={cnReports()}>
          <h1 className={cnReports('Title')}>
              Отчеты
          </h1>
          <Tabs className={cnReports('TabsList')} value={activeTab.value} onChange={onChangeTabs}>
              {tabsList.map(({ title, value }, idx) => (
                  <Tab className={cnReports('Tab')} label={title} value={value} key={idx} />
        ))}
          </Tabs>
          <div className={cnReports('Content')}>
              {activeTab.value === 'rent' && <ReportsRent />}
          </div>
      </div>
  );
};

export default ReportsAsync;
