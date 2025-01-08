import { FC, PointerEvent, useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router';

import './Nav.scss';

const cnNav = cn('Nav');

const Nav: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleIconClick = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    setAnchorEl(e.target as HTMLButtonElement);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
      <nav className={cnNav()}>
          <div className={cnNav('LogoWrap')}>
              <Link className={cnNav('LogoLink')} to='/winter-rent-crm'>
                  <span data-testid='cypress-title'>
                      Energy-Tour
                  </span>
              </Link>
          </div>
          <div className={cnNav('MenuWrap')}>
              <IconButton className={cnNav('Btn')} onClick={handleIconClick}>
                  <MenuIcon color='inherit' />
              </IconButton>
              <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleCloseMenu}>
                  <MenuItem onClick={handleCloseMenu}>
                      <Link to='prices'>
                          Цены
                      </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu}>
                      <Link to='rent'>
                          Учет проката
                      </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu}>
                      <Link to='calendar'>
                          Календарь записи
                      </Link>
                  </MenuItem>
              </Menu>
          </div>
      </nav>
  );
};

export default Nav;
