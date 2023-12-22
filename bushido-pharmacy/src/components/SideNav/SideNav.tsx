import React from 'react';

import styles from './SideNav.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation';

const SideNav = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <div className="relative w-[25%]">
        <ul className={styles.optionsList}>
          <li
            className={
              location?.pathname === ROUTES.HOME
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <Link to={ROUTES.HOME}>Products</Link>
          </li>
          <li
            className={
              location?.pathname === ROUTES.STATISTICS
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <Link to={ROUTES.STATISTICS}>Statistics</Link>
          </li>
          <li
            className={
              location?.pathname === ROUTES.ABOUT
                ? styles.listItemActive
                : styles.listItem
            }
          >
            <Link to={ROUTES.ABOUT}>About App</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
