import React, { useCallback } from 'react';

import styles from './SideNav.module.css';
import { Link, useLocation } from 'react-router-dom';

type SideNavProps = {
  productsView: boolean;
  setProductsView: React.Dispatch<React.SetStateAction<boolean>>;
  aboutAppView: boolean;
  setAboutAppView: React.Dispatch<React.SetStateAction<boolean>>;
  statsView: boolean;
  setStatsView: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNav = ({
  productsView,
  setProductsView,
  aboutAppView,
  setAboutAppView,
  statsView,
  setStatsView,
}: SideNavProps) => {
  //check url and setState based on it
  const location = useLocation();

  const activateProducts = useCallback(() => {
    setProductsView(true);
    setAboutAppView(false);
    setStatsView(false);
  }, [setProductsView, setAboutAppView, setStatsView]);

  const activateAboutApp = useCallback(() => {
    setProductsView(false);
    setAboutAppView(true);
    setStatsView(false);
  }, [setProductsView, setAboutAppView, setStatsView]);

  const activateStats = useCallback(() => {
    setProductsView(false);
    setAboutAppView(false);
    setStatsView(true);
  }, [setProductsView, setAboutAppView, setStatsView]);

  React.useEffect(() => {
    const { pathname } = location;
    if (pathname === '/') {
      activateProducts();
    } else if (pathname === '/statistics') {
      activateStats();
    } else if (pathname === '/about') {
      activateAboutApp();
    }
  }, [location, activateProducts, activateStats, activateAboutApp]);

  return (
    <React.Fragment>
      <div className="relative w-[25%]">
        <ul className={styles.optionsList}>
          <li
            className={productsView ? styles.listItemActive : styles.listItem}
          >
            <Link to={`/`}>Products</Link>
          </li>
          <li className={statsView ? styles.listItemActive : styles.listItem}>
            <Link to={`/statistics`}>Statistics</Link>
          </li>
          <li
            className={aboutAppView ? styles.listItemActive : styles.listItem}
          >
            <Link to={`/about`}>About App</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
