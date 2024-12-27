import { FC } from 'react';
import { cn } from '@bem-react/classname';

type CalendarAnchorProps = {
  tel: string | number;
};

const cnTelAnchor = cn('TelAnchor');

const TelAnchor: FC<CalendarAnchorProps> = ({ tel }) => (
    <a className={cnTelAnchor()} href={`tel:${tel}`}>
        {tel}
    </a>
);

export default TelAnchor;
