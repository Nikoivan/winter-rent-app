import { FC } from 'react';
import PageHeader from '../components/PageHeader/PageHeader.tsx';
import DatePicker from '../components/DatePicker/DatePicker.tsx';

const CalendarPage: FC = () => (
    <div>
        <PageHeader title='CRM Календарь' />
        <DatePicker />
    </div>
);

export default CalendarPage;
