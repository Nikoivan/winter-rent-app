import { FC } from 'react';
import { cn } from '@bem-react/classname';

import Nav from '../Nav/Nav.tsx';

import './Header.scss';

const cnHeader = cn('Header');

const Header: FC = () => (
    <header className={cnHeader()}>
        <Nav />
    </header>
);

export default Header;
