import { FC } from 'react';
import { cn } from '@bem-react/classname';

import './Info.scss';

const cnInfo = cn('Info');

const Info: FC = () => (
    <div className={cnInfo()}>
        <h1 className={cnInfo('Title')}>
            Внутренняя CRM система для сотрудников компании Energy-Tour
        </h1>
        <p className={cnInfo('Paragraph')}>
            Данное приложение разработано для компании Energy-Tour и является интеллектуальность собственностью
            <span />
            {' '}
            <span>
                <a href='https://wa.me/79780542072'>
                    Николаенко Александра
                </a>
                , являющегося правообладателем. Все авторские права
                защищены законом РФ.
            </span>
            {' '}
            Любое копирование, изменение или коммерческое использование разрешены только с согласия правообладателя.
        </p>
        <h2>
            &copy;
        </h2>
    </div>
);

export default Info;
